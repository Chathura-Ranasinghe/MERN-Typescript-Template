import { ErrorRequestHandler } from 'express'; // Import types from Express
import { INTERNAL_SERVER_ERROR } from '../constants/http'; // HTTP status codes

// -------------------------------------
// Main Error-handling Middleware
// -------------------------------------

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error); // Log error and request path for debugging

  return res.status(INTERNAL_SERVER_ERROR).send('Internal server error'); // Handle other errors
};

export default errorHandler; // Export middleware
