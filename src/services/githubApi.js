const axios = require('axios');
require('dotenv').config();

// retrieves the users Github data using a github token
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

module.exports = getGithubData
