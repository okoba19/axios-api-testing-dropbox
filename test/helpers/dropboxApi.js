const axios = require('axios');
const { BASE_URL } = require('../config/endpoints');

const sendRequest = async (url, data = null, method = 'get', bearerToken) => {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${bearerToken}`
  };

  try {
    const response = await axios({
      method,
      url: `${BASE_URL}/${url}`,
      headers,
      data,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error('API Error:', error.message);

    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      console.error('No response received');
      return {
        status: undefined,
        data: undefined,
      };
    } else {
      console.error('Request setup error:', error.message);
      return {
        status: undefined,
        data: undefined,
      };
    }
  }
};

module.exports = {
  sendRequest,
};