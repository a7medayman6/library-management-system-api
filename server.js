const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Logger = require('./utils/logger');
const path = require('path');
const swaggerDocs = require('./utils/swagger');

const filename = path.basename(__filename);

const app = express();
require('dotenv').config();


// Constants
const PORT = process.env.PORT || 3000;
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
app.use('/health', require('./routes/healthcheck'));
app.use(`${api_base_url}/health`, require('./routes/healthcheck'));
app.use(`${api_base_url}/users`, require('./routes/user'));
app.use(`${api_base_url}/books`, require('./routes/book'));
app.use(`${api_base_url}/checkout`, require('./routes/checkout'));
app.use(`${api_base_url}/return`, require('./routes/return'));

// Listen to the port
app.listen(PORT, () => 
{
  Logger.log(filename, `Server is listening on port ${PORT} ...`);

  swaggerDocs(app, api_base_url, PORT);

});

