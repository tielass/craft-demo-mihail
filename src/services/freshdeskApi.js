require('dotenv').config();
const axios = require('axios');

// creates a new contact on Freshdesk
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

module.exports = createFreshdeskContact
