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

// Import routes
import ApplicationsRoutes from "../routes/Applications.routes";
import Company_profilesRoutes from "../routes/Company_profiles.routes";
import ContactsRoutes from "../routes/Contacts.routes";
import MessagesRoutes from "../routes/Messages.routes";
import MultimediaRoutes from "../routes/Multimedia.routes";
import Professional_profilesRoutes from "../routes/Professional_profiles.routes";
import ProjectsRoutes from "../routes/Projects.routes";
import RatingsRoutes from "../routes/Ratings.routes";
import SkillsRoutes from "../routes/Skills.routes";
import UsersRoutes from "../routes/Users.routes";
import FiltersRoutes from "../routes/Filters.routes";
import AuthRoutes from "../routes/Auth.routes";
import RegistrationRoutes from "../routes/Registration.routes";

// Use routes
app.use("/api/v1", ApplicationsRoutes);
app.use("/api/v1", Company_profilesRoutes);
app.use("/api/v1", ContactsRoutes);
app.use("/api/v1", MessagesRoutes);
app.use("/api/v1", MultimediaRoutes);
app.use("/api/v1", Professional_profilesRoutes);
app.use("/api/v1", ProjectsRoutes);
app.use("/api/v1", RatingsRoutes);
app.use("/api/v1", SkillsRoutes);
app.use("/api/v1", UsersRoutes);
app.use("/api/v1", FiltersRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", RegistrationRoutes);

// Documentation (Swagger)
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "../documentation/swagger";
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
