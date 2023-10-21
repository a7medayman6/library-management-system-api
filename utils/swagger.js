const { Express, Request, Response } = require('express');

const swaggerJsDoc = require('swagger-jsdoc');

const swaggerUi = require('swagger-ui-express');

const Logger = require('./logger');

const path = require('path');

const filename = path.basename(__filename);

const version = process.env.API_VERSION || 'v1';

const swaggerOptions = 
{
    swaggerDefinition: 
    {
        openapi: '3.0.0',
        info: 
        {
            title: `Library API ${version}`,
            description: 'Library API Information',
            contact: {
                name: 'Ahmed Ayman'
            },
            servers: [`http://localhost:${process.env.PORT || 3000}`],
            version
        },
        components: 
        {
            securitySchemes: 
            {
                bearerAuth: 
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            },],

    },
    apis: ['./routes/*.js']

};
        
const swaggerSpec = swaggerJsDoc(swaggerOptions);

function swaggerDocs(app, api_base_url, port)
{
    // swagger page
    app.use(`${api_base_url}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // swagger json
    app.get(`${api_base_url}/docs.json`, (req, res) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    Logger.log(filename, `Swagger Docs is available on http://localhost:${port}${api_base_url}/docs ...`);

}


module.exports = swaggerDocs;