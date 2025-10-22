// middleware/auth.js

// Authentication middleware
const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // check for API key in headers

  if (!apiKey || apiKey !== 'MERN_SECRET_KEY') {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  next(); // proceed if the API key is correct
};

module.exports = auth;
