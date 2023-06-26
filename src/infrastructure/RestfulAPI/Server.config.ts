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
import ApplicationsRoutes from "$Applications/infrastructure/restfulAPI/Applications.routes";
import Company_profilesRoutes from "$Company_profiles/infrastructure/restfulAPI/Company_profiles.routes";
import ContactsRoutes from "$Contacts/infrastructure/restfulAPI/Contacts.routes";
import MessagesRoutes from "$Messages/infrastructure/restfulAPI/Messages.routes";
import MultimediaRoutes from "$Multimedia/infrastructure/restfulAPI/Multimedia.routes";
import Professional_profilesRoutes from "$Professional_profiles/infrastructure/restfulAPI/Professional_profiles.routes";
import ProjectsRoutes from "$Projects/infrastructure/restfulAPI/Projects.routes";
import RatingsRoutes from "$Ratings/infrastructure/restfulAPI/Ratings.routes";
import SkillsRoutes from "$Skills/infrastructure/restfulAPI/Skills.routes";
import UsersRoutes from "$Users/infrastructure/restfulAPI/Users.routes";
import FiltersRoutes from "$Filters/infrastructure/restfulAPI/Filters.routes";
import AuthRoutes from "$Auth/infrastructure/restfulAPI/Auth.routes";
import RegistrationRoutes from "$Registration/infrastructure/restfulAPI/Registration.routes";

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
import swaggerSpecs from "./documentation/swagger";
app.use("/api/v1/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
