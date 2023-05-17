# Description - GitHub + Freshdesk CLI

This is a command line program in JavaScript that retrieves the information of a GitHub User and creates a contact with that information in Freshdesk using their respective APIs.


## Installation

- Node.js v16.15.1
- npm 9.3.0

- Dependencies :
  - dotenv - For reading the env Tokens
  - axios - Promise based HTTP client node.js
  - jest - JS framework for writing unit tests

1. Clone the repository: `git clone git@github.com:tielass/craft-demo-mihail.git`
2. Navigate to the project directory: `cd quickbase-test`
3. Install the dependencies: `npm install <dependency>`

## Usage

1. Set the environment variables:
   - `GITHUB_TOKEN`: GitHub personal access token
   - `FRESHDESK_TOKEN`: Freshdesk API key

2. Run the program: `node index.js`

3. Follow the prompts to enter the GitHub username and Freshdesk subdomain.

## Running the Tests

To run the unit tests, use the following command: `npx jest contact.test.js`
