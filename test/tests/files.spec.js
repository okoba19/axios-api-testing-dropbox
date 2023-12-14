const { expect } = require('chai');
const dropboxApi = require('../helpers/dropBoxApi');
require('dotenv').config();

const validToken = process.env.VALID_TOKEN;
const invalidToken = process.env.INVALID_TOKEN;

describe('Dropbox Files Tests', () => {

    it('Positive Test: List Folder Contents', async () => {
        const endpoint = 'files/list_folder';
        const path = '/memes';

        const response = await dropboxApi.sendRequest(endpoint, { path }, 'post', validToken);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('entries');
        expect(response.data.entries).to.be.an('array');
        expect(response.data.entries).to.have.lengthOf(1);
    });

    it('Positive Test: Get File Request Count', async () => {
        const endpoint = 'file_requests/count';

        const response = await dropboxApi.sendRequest(endpoint, null, 'post', validToken);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('file_request_count').that.is.a('number');
        expect(response.data).to.have.property('file_request_count').equals(0);
    });

    it('Negative Test: Add Template with App Folder App', async () => {
        const endpoint = 'file_properties/templates/add_for_user';

        const templateData = {
            description: "Folder for public view",
            fields: [{
                description: "Public Polices",
                name: "Security Policy",
                type: "string"
            }],
            name: "{Public template}"
        };

        const response = await dropboxApi.sendRequest(endpoint, templateData, 'post', validToken);

        expect(response.status).to.equal(400);
    });

    it('Positive Test: Create Folder', async () => {
        const endpoint = 'files/create_folder_v2';
        const folderPath = '/Homework/math';
        const autorename = false;

        const response = await dropboxApi.sendRequest(endpoint, { path: folderPath, autorename }, 'post', validToken);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('metadata');
        expect(response.data.metadata).to.have.property('name').that.equals('math');
        expect(response.data.metadata).to.have.property('path_display').that.equals('/Homework/math');
    });

    it('Negative Test: Create Folder with Invalid Path', async () => {
        const endpoint = 'files/create_folder_v2';
        const invalidFolderPath = '/Homework/math';
        const autorename = false;

        const response = await dropboxApi.sendRequest(endpoint, { path: invalidFolderPath, autorename }, 'post', validToken);

        expect(response.status).to.equal(409);
        expect(response.data.error_summary).to.contain('path/conflict/folder');
    });

    it('Negative Test: Delete Non-Existent File/Folder', async () => {
        const endpoint = 'files/delete_v2';
        const nonExistentPath = '/Homework/nonexistent.txt';

        const response = await dropboxApi.sendRequest(endpoint, { path: nonExistentPath }, 'post', validToken);

        expect(response.status).to.equal(409);
        expect(response.data.error_summary).to.contain('path_lookup/not_found');
        expect(response.data.error['.tag']).to.equal('path_lookup');
        expect(response.data.error.path_lookup['.tag']).to.equal('not_found');
    });

    it('Positive Test: Delete Folder Created', async () => {
        const folderPath = '/Homework';
        const endpoint = 'files/delete_v2';

        const response = await dropboxApi.sendRequest(endpoint, { path: folderPath }, 'post', validToken);

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('metadata');
        expect(response.data.metadata).to.have.property('.tag').that.equals('folder');
    });

});