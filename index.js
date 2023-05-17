require('dotenv').config();
const axios = require('axios');

// Fetch the gitHub user's data
async function getGithubData(username, token) {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const emailData = await axios.get(`https://api.github.com/user/emails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const primaryEmail = emailData.data.filter((email) =>  email.primary == true )[0].email
    response.data.email = primaryEmail
    return response.data;
  } catch (error) {
    console.error('Failed to get users information', error.message)
    return null
  }
}

module.exports = {
  getGithubData,
  createFreshdeskContact,
};

// Create a new contact in Freshdesk
async function createFreshdeskContact(subdomain, contactInfo, apiKey ) {
  try {
    const response = await axios.post(`https://${subdomain}.myfreshworks.com/crm/sales/api/contacts`, contactInfo,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${apiKey}`
      }
    });
    return response.data
  } catch (error) {
    console.error('Failed to create a Freshdesk contact', error.message)
    return null
  }
}

// module.exports = createFreshdeskContact;

// Read user input from the command line
const readline = require('readline');
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInput.question('Enter GitHub username - ' , async (username) => {
  userInput.question('Enter Freshdesk subdomain - ', async (subdomain) => {
    userInput.close();

    const githubToken = process.env.GITHUB_TOKEN
    const freshdeskToken = process.env.FRESHDESK_TOKEN

    const githubUserInfo = await getGithubData(username, githubToken)

    if(githubUserInfo){
      console.log(
        `This is the information for github user - ${username}:
        Username: ${githubUserInfo.login}
        Name: ${githubUserInfo.name}
        Bio: ${githubUserInfo.bio}
        Email: ${githubUserInfo.email}
        `
      )

      const contactData = {
        first_name: githubUserInfo.name,
        email: githubUserInfo.email
      };

      const createFdContact = await createFreshdeskContact(subdomain, contactData, freshdeskToken  )
      if(createFdContact) {
        console.log(
          `A new freshdesk contact has been created:
          Name: ${createFdContact.contact.first_name}
          Email: ${createFdContact.contact.email}
          `)
      }
    }
  });
});
