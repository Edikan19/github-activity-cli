# \# GitHub Activity CLI

# 

# A simple command-line interface to fetch and display recent activity of any GitHub user.

# 

# \## Features

# 

# &#x20;\*\*Displays GitHub Activity\*\* - Shows recent events like:

# \- Commits pushed to repositories

# \- Issues opened/closed

# \- Pull requests created/merged

# \- Repository stars (watches)

# \- Repository forks

# \- Repository creations

# 

# &#x20;\*\*Error Handling\*\* - Gracefully handles:

# \- Invalid GitHub usernames (404)

# \- API rate limiting (403)

# \- Network errors

# \- Missing username argument

# 

# &#x20;\*\*Optional Authentication\*\* - Supports GitHub personal access tokens to avoid rate limiting

# 

# \## Installation

# 

# 1\. Clone this repository:

# ```bash

# &#x20;  git clone https://github.com/YOUR\_USERNAME/github-activity-cli.git

# &#x20;  cd github-activity-cli

# ```

# 

# 2\. Install (optional, for global access):

# ```bash

# &#x20;  npm install -g .

# ```

# 

# \## Usage

# 

# \### Basic Usage (without authentication)

# 

# ```bash

# node index.js <username>

# ```

# 

# \*\*Example:\*\*

# ```bash

# node index.js octocat

# ```

# 

# \### With GitHub Token (Recommended)

# 

# To avoid rate limiting, set your GitHub personal access token:

# 

# ```bash

# export GITHUB\_TOKEN=your\_token\_here

# node index.js <username>

# ```

# 

# On Windows (Command Prompt):

# ```cmd

# set GITHUB\_TOKEN=your\_token\_here

# node index.js <username>

# ```

# 

# On Windows (PowerShell):

# ```powershell

# $env:GITHUB\_TOKEN="your\_token\_here"

# node index.js <username>

# ```

# 

# \### If Installed Globally

# 

# ```bash

# github-activity <username>

# ```

# 

# \## Getting a GitHub Personal Access Token

# 

# 1\. Go to \[GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

# 2\. Click "Generate new token"

# 3\. Select the `public\_repo` scope

# 4\. Copy the token and use it as shown above

# 

# \## Output Example
Fetching activity for user: octocat...

Recent activity for octocat:

Pushed 3 commits to octocat/Hello-World
Opened an issue in octocat/Hello-World
Starred octocat/awesome-repo



## API Details

- **Endpoint:** `GET https://api.github.com/users/{username}/events`
- **Rate Limits:**
  - Unauthenticated: 60 requests/hour
  - Authenticated: 5,000 requests/hour

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| User not found | Invalid GitHub username | Check the spelling |
| API rate limit exceeded | Too many requests | Wait or use GitHub token |
| Network error | Connection issue | Check internet connection |

## License

ISC
