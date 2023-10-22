const { spec, request } = require('pactum');
const dotenv = require('dotenv');
dotenv.config();

const API_HOST = process.env.API_HOST || 'localhost';
const API_PORT = process.env.API_PORT || '3000';
const API_VERSION = process.env.API_VERSION || 'v1';

/* Set base url to the backend URL */
const api_base_url = `http://${API_HOST}:${API_PORT}/api/${API_VERSION}`;

request.setBaseUrl(api_base_url)

/* Set the endpoint to the health endpoint */
const health_check_endpoint = '/health';

/* Send the request */
describe('Health Check', () => 
{
    it('should return 200 OK', async () => 
    {
        await spec()
            .get(health_check_endpoint)
            .expectStatus(200)
            .expectJson({
                health: 'OK'
            });
    });
});

