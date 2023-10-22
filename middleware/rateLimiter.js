const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitter = setRateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

module.exports = rateLimitter;