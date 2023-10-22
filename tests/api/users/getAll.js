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

describe('User API, List All Users Endpoint', () =>
{
    it('should return 200, list all users', async () =>
    {   
        store.data = await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(user_endpoint)
            .expectStatus(200)
            .expectJsonLike('data', [])
            .returns('data', 'data');
    });

    it('should return 200, and the list of users should be the same', async () =>
    {
        await spec()
        .withAuth(adminCredentials.username, adminCredentials.password)
        .get(user_endpoint)
        .expectStatus(200)
        .expectJsonLike('data', [])
        .expectJsonLength('data', store.data.length);
    });
    
    // create a new user with test and test@gmail.com email then check the data length to be store.data.length + 1
    it('should return 201, create a new user to check the length of users list after', async () =>
    {
        store.id = await spec()
        .withAuth(adminCredentials.username, adminCredentials.password)
        .post(user_endpoint)
        .withJson(
            {
                name: 'testing1234',
                email: 'testing1234@gmail.com'
            })
        .expectStatus(201)
        .returns('data.id', 'id');
    });

    it('should return 200, and the list of users should increase by one', async () =>
    {
        store.data = await spec()
        .withAuth(adminCredentials.username, adminCredentials.password)
        .get(user_endpoint)
        .expectStatus(200)
        .expectJsonLike('data', [])
        .expectJsonLength('data', store.data.length + 1)
        .returns('data', 'data');
    });

    it('should return 200, deleting the newly created user so we can run the test again', async () =>
    {
        await spec()
        .withAuth(adminCredentials.username, adminCredentials.password)
        .delete(`${user_endpoint}/{id}`)
        .withPathParams('id', store.id)
        .expectStatus(200)
    });
    
    it('should return 200, and the list of users should decrease by one', async () =>
    {
        await spec()
        .withAuth(adminCredentials.username, adminCredentials.password)
        .get(user_endpoint)
        .expectStatus(200)
        .expectJsonLike('data', [])
        .expectJsonLength('data', store.data.length - 1);
    });
});