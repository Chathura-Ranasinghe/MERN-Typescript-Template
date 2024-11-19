import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import mongoose from 'mongoose';

import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import errorHandler from './middleware/errorHandler';
import catchErrors from './utils/catchErrors';

const app = express();

// -------------------------------------
// Middleware
// -------------------------------------

// JSON and URL-encoded body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE']  // Optionally specify methods
  })
);

// Cookie parsing middleware
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Security headers middleware
app.use(helmet());

// -------------------------------------
// Routes
// -------------------------------------

// Health check endpoint
app.get('/health',
  catchErrors(
    async (_, res, next) => {
      //throw new Error("Test error"); // Uncomment if testing error handling
      return res.status(200).json({
        status: 'healthy',
      });
    }  
  )
);

// auth routes
//app.use("/auth", authRoutes);

// -------------------------------------
// Error Handling Middleware
// -------------------------------------
app.use(errorHandler);

// -------------------------------------
// Server & Database Connection
// -------------------------------------

// Start the server
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});

// -------------------------------------
// Graceful Shutdown Handling
// -------------------------------------

process.on('SIGINT', async () => {
  console.log('Gracefully shutting down');
  await mongoose.connection.close();
  process.exit(0);
});
