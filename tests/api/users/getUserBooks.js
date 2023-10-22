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

describe('User API, List Users Books Endpoint', () =>
{
    before(async () =>
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

        console.log(`Created user with id ${store.id} for testing ...`);
    });
    
    it('should return 200, and list user with id 1 books', async () =>
    {   
        store.data = await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/1/books`)
            .expectStatus(200)
            .expectJsonLike('data', [])
            .returns('data', 'data');
    });


    it('should return 200, and the return an empty list', async () =>
    {
        store.data = await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/${store.id}/books`)
            .expectStatus(200)
            .expectJsonLike('data', [])
            .expectJsonLength('data', 0)
            .returns('data', 'data');
    });

    it('should return 404, because the user with Id = 10000 does not exist', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/10000/books`)
            .expectStatus(404);
    });

    it('should return 400, because the user id is invalid', async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .get(`${user_endpoint}/test/books`)
            .expectStatus(400);
    });

    after(async () =>
    {
        await spec()
            .withAuth(adminCredentials.username, adminCredentials.password)
            .delete(`${user_endpoint}/{id}`)
            .withPathParams('id', store.id)
            .expectStatus(200)

        console.log(`Deleted user with id ${store.id} after testing ...`);
    });

});