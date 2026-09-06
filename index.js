#!/usr/bin/env node

/**
 * GitHub Activity CLI
 * Fetches and displays recent activity of a GitHub user
 */

const https = require('https');

// Get the username from command line arguments
const username = process.argv[2];

// Validate that a username was provided
if (!username) {
  console.error(' Error: Please provide a GitHub username');
  console.error('Usage: github-activity <username>');
  process.exit(1);
}

/**
 * Fetch user activity from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise} - Promise that resolves with activity data
 */
function fetchUserActivity(username) {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/users/${username}/events`;
    
    const options = {
      headers: {
        'User-Agent': 'GitHub-Activity-CLI'
      }
    };

    // Add authentication if token is available
    if (process.env.GITHUB_TOKEN) {
      options.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    https.get(url, options, (response) => {
      let data = '';

      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });

      // Parse complete response
      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            const events = JSON.parse(data);
            resolve(events);
          } catch (error) {
            reject(new Error('Failed to parse GitHub API response'));
          }
        } else if (response.statusCode === 404) {
          reject(new Error(`User "${username}" not found on GitHub`));
        } else if (response.statusCode === 403) {
          reject(new Error(`API rate limit exceeded. GitHub limits unauthenticated requests. Please try again in a few minutes or use a GitHub personal access token.`));
        } else {
          reject(new Error(`GitHub API error: ${response.statusCode} ${response.statusMessage}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Network error: ${error.message}`));
    });
  });
}

/**
 * Format and display the activity
 * @param {Array} events - Array of GitHub events
 */
function displayActivity(events) {
  if (events.length === 0) {
    console.log(`\n No recent activity found for user: ${username}\n`);
    return;
  }

  console.log(`\n Recent activity for ${username}:\n`);
  
  events.forEach((event, index) => {
    const { type, repo, payload, created_at } = event;
    
    switch (type) {
  case 'PushEvent':
    const commitCount = payload.commits ? payload.commits.length : 0;
    console.log(`  ${index + 1}. Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repo.name}`);
    break;
      
      case 'IssuesEvent':
        console.log(`  ${index + 1}. ${payload.action} an issue in ${repo.name}`);
        break;
      
      case 'PullRequestEvent':
        console.log(`  ${index + 1}. ${payload.action} a pull request in ${repo.name}`);
        break;
      
      case 'CreateEvent':
        const refType = payload.ref_type || 'repository';
        console.log(`  ${index + 1}. Created a new ${refType} in ${repo.name}`);
        break;
      
      case 'DeleteEvent':
        console.log(`  ${index + 1}. Deleted a ${payload.ref_type} in ${repo.name}`);
        break;
      
      case 'WatchEvent':
        console.log(`  ${index + 1}. Starred ${repo.name}`);
        break;
      
      case 'ForkEvent':
        console.log(`  ${index + 1}. Forked ${repo.name}`);
        break;
      
      default:
        console.log(`  ${index + 1}. ${type} on ${repo.name}`);
    }
  });
  
  console.log();
}

/**
 * Main function
 */
async function main() {
  try {
    console.log(`\n Fetching activity for user: ${username}...`);
    const events = await fetchUserActivity(username);
    displayActivity(events);
  } catch (error) {
    console.error(`\n ${error.message}\n`);
    process.exit(1);
  }
}

// Run the CLI
main();