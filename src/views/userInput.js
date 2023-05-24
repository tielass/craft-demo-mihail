const readline = require('readline');

function handleUserInput(callback) {
  const userInput = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  userInput.question('Enter GitHub username - ', async (username) => {
    userInput.question('Enter Freshdesk subdomain - ', async (subdomain) => {
      userInput.close();
      callback(username, subdomain);
    });
  });
}

module.exports = handleUserInput;
