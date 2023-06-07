import { Router } from "express";
import { SkillsGet } from "../middleWares/Skills.middleWares";

const router = Router();

router.get('/skills', SkillsGet);

export default router;
