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
import ApplicationsRoutes from "../../app/Applications/infrastructure/restfulAPI/Applications.routes";
import Company_profilesRoutes from "../../app/Company_profiles/infrastructure/restfulAPI/Company_profiles.routes";
import ContactsRoutes from "../../app/Contacts/infrastructure/restfulAPI/Contacts.routes";
import MessagesRoutes from "../../app/Messages/infrastructure/restfulAPI/Messages.routes";
import MultimediaRoutes from "../../app/Multimedia/infrastructure/restfulAPI/Multimedia.routes";
import Professional_profilesRoutes from "../../app/Professional_profiles/infrastructure/restfulAPI/Professional_profiles.routes";
import ProjectsRoutes from "../../app/Projects/infrastructure/restfulAPI/Projects.routes";
import RatingsRoutes from "../../app/Ratings/infrastructure/restfulAPI/Ratings.routes";
import SkillsRoutes from "../../app/Skills/infrastructure/restfulAPI/Skills.routes";
import UsersRoutes from "../../app/Users/infrastructure/restfulAPI/Users.routes";
import FiltersRoutes from "../../app/Filters/infrastructure/restfulAPI/Filters.routes";
import AuthRoutes from "../../app/Auth/infrastructure/restfulAPI/Auth.routes";
import RegistrationRoutes from "../../app/Registration/infrastructure/restfulAPI/Registration.routes";

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
