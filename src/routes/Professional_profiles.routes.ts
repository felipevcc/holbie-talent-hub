// education - experience
import { Router } from "express";
import { ProfilesGet } from "../middleWares/Professional_profiles.middleWares";
import { ProfileGet } from "../middleWares/Professional_profiles.middleWares";
import { ProfileEducationGet } from "../middleWares/Professional_profiles.middleWares";
import { ProfileExperienceGet } from "../middleWares/Professional_profiles.middleWares";
import { EducationGet } from "../middleWares/Professional_profiles.middleWares";
import { ExperienceGet } from "../middleWares/Professional_profiles.middleWares";

const router = Router();

router.get('/professional_profiles', ProfilesGet);
router.get('/professional_profiles/:profile_id', ProfileGet);
router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);
router.get('/education/:education_id', EducationGet);
router.get('/experience/:experience_id', ExperienceGet);

export default router;
