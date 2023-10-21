const router = require('express').Router();



/**
 * @openapi
 * /health:
 *  get:
 *      summary: Health check
 *      description: Returns OK if the server is up and running
 *      tags: [Health Check]
 *      responses:
 *          200:
 *              description: OK
 */
router.get('/', (req, res) => 
{
    res.json({health: 'OK'});
});

module.exports = router;