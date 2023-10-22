// implement a middleware function to perform Basic Auth authentication on incoming requests.

const auth = require('basic-auth');

admin = {username: 'admin', password: 'admin'}

const basicAuth = async (req, res, next) =>
{
    const credentials = auth(req);

    if (credentials)
    {
        if (credentials.name === admin.username && credentials.pass === admin.password)
        {
            return next();
        }
    }

    res.status(401).json({message: 'Access denied'});
}

module.exports = { basicAuth };