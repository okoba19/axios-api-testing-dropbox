const { expect } = require('chai');
const dropboxApi = require('../helpers/dropBoxApi');
require('dotenv').config();

const validToken = process.env.VALID_TOKEN;
const invalidToken = process.env.INVALID_TOKEN;
const account_id = process.env.VALID_ACCOUNT_ID;

describe('Dropbox API Tests', () => {

  it('Negative Test: User Authentication with Invalid Bearer Token', async () => {
    const query = 'foo';
    const endpoint = 'check/user';

    const response = await dropboxApi.sendRequest(endpoint, { query }, 'post', 'invalid-bearer-token');

    expect(response.status).to.equal(401);
    expect(response.data).to.not.be.undefined;
  });

  it('Positive Test: User Authentication with Valid Bearer Token', async () => {
    const query = 'foo';
    const endpoint = 'check/user';

    const response = await dropboxApi.sendRequest(endpoint, { query }, 'post', validToken);
    expect(response.status).to.equal(200);
    console.log(response);
  });

  it('Positive Test: List Folder Contents', async () => {
    const path = '';
    const endpoint = 'files/list_folder';
    const response = await dropboxApi.sendRequest(endpoint, { path }, 'post', validToken);
    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('entries');
  });

  it('Positive Test: Get File Request Count with Valid Bearer Token', async () => {
    const endpoint = 'file_requests/count';
    const response = await dropboxApi.sendRequest(endpoint, null, 'post', validToken);

    expect(response.status).to.equal(200);
    expect(response.data).to.have.property('file_request_count').that.is.a('number');
    expect(response.data).to.have.property('file_request_count').equals(0);
  });

});