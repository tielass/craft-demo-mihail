const handleUserInput = require('./views/userInput');
const getGithubData = require('./services/githubApi');
const createFreshdeskContact = require('./services/freshdeskApi');
require('dotenv').config();


handleUserInput(async (username, subdomain) => {
  const githubToken = process.env.GITHUB_TOKEN;
  const freshdeskToken = process.env.FRESHDESK_TOKEN;

  const githubUserInfo = await getGithubData(username, githubToken);

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
