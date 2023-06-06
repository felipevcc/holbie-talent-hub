/*
  - Create server instance and register blueprints
*/

// Create server instance
import express from "express";
const app = express();

// Check request status code
import morgan from "morgan";
app.use(morgan("dev"));

// Load vars from .env file
import * as dotenv from "dotenv";
dotenv.config();

// Set allowed connections
import cors from "cors";
app.use(cors({ origin: "*" }));

import helmet from "helmet";
app.use(helmet());

// Handle JSON
app.use(express.json());

// import routes
import UsersRoutes from '../routes/Users.routes';

// use routes
app.use('/api/users', UsersRoutes);

export default app;
