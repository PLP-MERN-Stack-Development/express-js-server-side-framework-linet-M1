// middleware/logger.js

// Custom logger middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString(); // current date and time
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // move to the next middleware or route
};

module.exports = logger;
