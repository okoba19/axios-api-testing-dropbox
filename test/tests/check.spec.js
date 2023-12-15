const { expect } = require('chai');
const dropboxApi = require('../helpers/dropBoxApi');
require('dotenv').config();

const validToken = process.env.VALID_TOKEN;
const invalidToken = process.env.INVALID_TOKEN;

describe('Dropbox API Tests', () => {

  it('Negative Test: User Authentication with Invalid Bearer Token', async () => {
    const query = 'foo';
    const endpoint = 'check/user';
    const response = await dropboxApi.sendRequest(endpoint, { query }, 'post', invalidToken);

    expect(response.status).to.equal(401);
    expect(response.data).to.have.property('error');
    expect(response.data.error).to.have.property('.tag').that.equals('invalid_access_token');
    expect(response.data).to.have.property('error_summary').that.equals('invalid_access_token/');
  });

  it('Positive Test: User Authentication with Valid Bearer Token', async () => {
    const query = 'foo';
    const endpoint = 'check/user';

    const response = await dropboxApi.sendRequest(endpoint, { query }, 'post', validToken);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('result').that.equals(query);
  });

});