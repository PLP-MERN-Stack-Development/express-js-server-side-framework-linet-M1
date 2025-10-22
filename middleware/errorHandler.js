// middleware/errorHandler.js

// This is our global error handler middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Logs the error in the console for debugging

  const statusCode = err.statusCode || 500; // Default to 500 if none
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

module.exports = errorHandler;
