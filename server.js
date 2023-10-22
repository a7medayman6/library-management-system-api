const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Logger = require('./utils/logger');
const path = require('path');
const swaggerDocs = require('./utils/swagger');
const rateLimitter = require('./middleware/rateLimiter');
const { basicAuth } = require('./middleware/auth');

const filename = path.basename(__filename);

const app = express();
require('dotenv').config();


// Constants
const PORT = process.env.API_PORT || 3000;
const HOST = '0.0.0.0'

const api_version = process.env.API_VERSION || 'v1';
const api_base_url = `/api/${api_version}`;
const cors_options = {
  origin: process.env.CORS_ORIGIN | 'http://localhost:8081',
  optionsSuccessStatus: 200
}


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors(cors_options));


// Routes
// 
app.use('/health', require('./routes/healthcheck'));
app.use(`${api_base_url}/health`, require('./routes/healthcheck'));
app.use(`${api_base_url}/users`, rateLimitter, basicAuth, require('./routes/user'));
app.use(`${api_base_url}/books`, rateLimitter, basicAuth, require('./routes/book'));
app.use(`${api_base_url}/checkout`, rateLimitter, basicAuth, require('./routes/checkout'));
app.use(`${api_base_url}/return`, rateLimitter, basicAuth, require('./routes/return'));
app.use(`${api_base_url}/analytics`, rateLimitter, require('./routes/analytics'));




app.listen(PORT, HOST, () => 
{
  Logger.log(filename, `Server is listening on port ${PORT} ...`);

  swaggerDocs(app, api_base_url, PORT);

});

