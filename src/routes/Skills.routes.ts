import { Router } from "express";
import {
  SkillsGet,
  SkillGetById,
  SkillPost,
  SkillPut,
  SkillDelete,
  ProfileSkillsGet,
  ProfileSkillPost,
  ProjectSkillsGet,
  ProjectSkillPost
} from "../middleWares/Skills.middleWares";

const router = Router();

// skills
router.get('/skills', SkillsGet);
router.get('/skills/:skill_id', SkillGetById);
router.post('/skills', SkillPost);
router.put('/skills/:skill_id', SkillPut);
router.delete('/skills/:skill_id', SkillDelete);

// professional_skills
router.get('/professional_profiles/:profile_id/skills', ProfileSkillsGet);
router.post('/professional_profiles/:profile_id/skills', ProfileSkillPost);

// project_skills
router.get('/projects/:project_id/skills', ProjectSkillsGet);
router.post('/projects/:project_id/skills', ProjectSkillPost);

export default router;
