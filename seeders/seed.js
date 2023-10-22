const dotenv = require('dotenv');
dotenv.config();

const { adminCredentials } = require('../config/creds');

const { seedUsers } = require('./users');
const { seedBooks } = require('./books');
const { seedCheckouts } = require('./checkouts');

const API_HOST = process.env.API_HOST || 'localhost';
const API_PORT = process.env.API_PORT || '3000';
const API_VERSION = process.env.API_VERSION || 'v1';

const api_base_url = `http://${API_HOST}:${API_PORT}/api/${API_VERSION}`;
const users_url = `${api_base_url}/users`;
const books_url = `${api_base_url}/books`;
const checkouts_url = `${api_base_url}/checkout`;


const seed = async () => 
{
    await seedUsers(users_url, adminCredentials).then(() => console.log('done seeding users.'));
    await seedBooks(books_url, adminCredentials).then(() => console.log('done seeding books.'));
    await seedCheckouts(checkouts_url, adminCredentials).then(() => console.log('done seeding checkouts.'));
}

seed();