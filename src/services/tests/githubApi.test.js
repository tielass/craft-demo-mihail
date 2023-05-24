const axios = require('axios');

const getGithubData = require('../githubApi');

jest.mock('axios');

describe('getGithubData', () => {
  test('should fetch GitHub user data successfully', async () => {
    const username = 'exampleuser';
    const token = 'exampletoken';
    const responseData = {
      login: 'exampleuser',
      name: 'Example User',
      bio: 'Example bio',
      email: 'example@example.com',
    };
    const emailData = [
      { primary: true, email: 'example@example.com' },
      { primary: false, email: 'example2@example.com' },
    ];
    axios.get.mockResolvedValueOnce({ data: responseData });
    axios.get.mockResolvedValueOnce({ data: emailData });

    const result = await getGithubData(username, token);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(axios.get).toHaveBeenCalledWith(`https://api.github.com/user/emails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  });


  test('should handle failure to fetch GitHub user data', async () => {
    const username = 'exampleuser';
    const token = 'exampletoken';
    const errorMessage = 'Failed to get users information';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const result = await getGithubData(username, token);

    expect(result).toBeNull();
  });
});
