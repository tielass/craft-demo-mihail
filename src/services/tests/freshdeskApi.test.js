const axios = require('axios');

const createFreshdeskContact = require('../freshdeskApi');

jest.mock('axios');

describe('createFreshdeskContact', () => {
  test('should create a Freshdesk contact successfully', async () => {
    const subdomain = 'exampledomain';
    const contactInfo = {
      first_name: 'Example User',
      email: 'example@example.com',
    };
    const apiKey = 'exampleapikey';
    const responseData = {
      contact: {
        first_name: 'Example User',
        email: 'example@example.com',
      },
    };
    axios.post.mockResolvedValueOnce({ data: responseData });

    const result = await createFreshdeskContact(subdomain, contactInfo, apiKey);

    expect(result).toEqual(responseData);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`https://${subdomain}.myfreshworks.com/crm/sales/api/contacts`, contactInfo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token token=${apiKey}`,
      },
    });
  });

  test('should handle failure to create a Freshdesk contact', async () => {
    const subdomain = 'exampledomain';
    const contactInfo = {
      first_name: 'Example User',
      email: 'example@example.com',
    };
    const apiKey = 'exampleapikey';
    const errorMessage = 'Failed to create a Freshdesk contact';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    const result = await createFreshdeskContact(subdomain, contactInfo, apiKey);
    expect(result).toBeNull();
  });
});
