import { Router } from "express";
import { ProjectsGet, ProjectGetById } from "../middleWares/Projects.middleWares";

const router = Router();

router.get('/projects', ProjectsGet, ProjectGetById);

export default router;
