// education - experience
import { Router } from "express";
import {
  ProfilesGet,
  ProfileGet,
  ProfileEducationGet,
  ProfileExperienceGet,
  EducationGet,
  ExperienceGet
} from "../middleWares/Professional_profiles.middleWares";

const router = Router();

router.get('/professional_profiles', ProfilesGet);
router.get('/professional_profiles/:profile_id', ProfileGet);
router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);
router.get('/education/:education_id', EducationGet);
router.get('/experience/:experience_id', ExperienceGet);

export default router;
