import { Router } from "express";
import {
  ProfilesGet,
  ProfileGetById,
  ProfileEducationGet,
  ProfileExperienceGet,
  EducationGetById,
  ExperienceGetById
} from "../middleWares/Professional_profiles.middleWares";

const router = Router();

router.get('/professional_profiles', ProfilesGet);
router.get('/professional_profiles/:profile_id', ProfileGetById);

router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);

router.get('/education/:education_id', EducationGetById);
router.get('/experience/:experience_id', ExperienceGetById);

export default router;
