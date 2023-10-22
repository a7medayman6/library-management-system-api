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


describe('User API, Delete User By ID', () =>
{
    // create a user and store the id in store.id
    it('should return 201, name and email are provided and valid, creating user to delete later', async () =>
    {   

        store.id = await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .post(user_endpoint)
            .withJson(
                {
                    name: 'testing1234',
                    email: 'testing1234@gmail.com',
                })
            .expectStatus(201)
            .returns('data.id', 'id');
        console.log(`Created a user with id = ${store.id}`)
    });

    it(`should return 200, and delete the user with Id = ${store.id}`, async () =>
    {   
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .delete(`${user_endpoint}/${store.id}`)
            .expectStatus(200)
    });

    it(`should return 404, because the user with Id = ${store.id} should be deleted`, async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/${store.id}`)
            .expectStatus(404);
    });

    it('should return 404, because the user with Id = 10000 does not exist', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .delete(`${user_endpoint}/1000000`)
            .expectStatus(404);
    });

    it('should return 400, because the user id is invalid', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/test`)
            .expectStatus(400);
    });
    
});