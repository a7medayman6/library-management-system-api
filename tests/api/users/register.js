const { spec, request } = require('pactum');
const { adminCredentials } = require('../../../config/creds');
const dotenv = require('dotenv');
dotenv.config();

const API_HOST = process.env.API_HOST || 'localhost';
const API_PORT = process.env.API_PORT || '3000';
const API_VERSION = process.env.API_VERSION || 'v1';

/* Set base url to the backend URL */
const api_base_url = `http://${API_HOST}:${API_PORT}/api/${API_VERSION}`;
request.setBaseUrl(api_base_url);


/* Set the endpoint to the health endpoint */
const user_endpoint = '/users';

const store = {}

describe('User API, Register Endpoint', () =>
{
    it('should return 201, name and email are provided and valid', async () =>
    {   

        store.id = await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withAuth('admin', 'admin')
            .withJson(
                {
                    name: 'testing',
                    email: 'testing@gmail.com',
                })
            .expectStatus(201)
            .expectJson('message', 'User created successfully.')
            .returns('data.id', 'id');
        

            
    });

    it('should return 400, because the user email already exists', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withAuth('admin', 'admin')
            .withJson(
                {
                    name: 'testing',
                    email: 'testing@gmail.com'
                })
            .expectStatus(400);
    });

    it('should return 200, deleting the newly created user so we can run the test again', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .delete(`${user_endpoint}/{id}`)
            .withAuth('admin', 'admin')
            .withPathParams('id', store.id)
            .expectStatus(200)
            .expectJson('message', 'User deleted successfully.');
    });

    it('should return 400, because the email is invalid', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withAuth('admin', 'admin')
            .withJson(
                {
                    name: 'test',
                    email: 'test'
                })
            .expectStatus(400);
    });

    it('should return 400, because the name is missing', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withAuth('admin', 'admin')
            .withJson(
                {
                    email: 'test@gmail.com'
                })
            .expectStatus(400);
    });

    it('should return 400, because the email is missing', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withAuth('admin', 'admin')
            .withJson(
                {
                    name: 'test'
                })
            .expectStatus(400);
    });

    
});