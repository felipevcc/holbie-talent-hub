import { Router } from "express";
import { ProjectsGet } from "../middleWares/Projects.middleWares";

const router = Router();

router.get('/projects', ProjectsGet);

export default router;
