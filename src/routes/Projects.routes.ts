import { Router } from "express";
import { ProjectsGet, ProjectGetById, ProjectCollaboratorsGet } from "../middleWares/Projects.middleWares";

const router = Router();

router.get('/projects', ProjectsGet, ProjectGetById);
router.get('/projects/:project_id/professional_profiles',ProjectCollaboratorsGet);

export default router;
