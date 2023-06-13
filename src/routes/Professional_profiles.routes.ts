import { Router } from "express";
import {
  ProfilesGet,
  ProfileGetById,
  ProfilePost,
  ProfilePut,
  ProfileDelete,
  ProfileEducationGet,
  EducationGetById,
  EducationPost,
  EducationPut,
  EducationDelete,
  ProfileExperienceGet,
  ExperienceGetById,
  ExperiencePost,
  ExperiencePut,
  ExperienceDelete
} from "../middleWares/Professional_profiles.middleWares";

const router = Router();

// professional_profiles
router.get('/professional_profiles', ProfilesGet);
router.get('/professional_profiles/:profile_id', ProfileGetById);
router.post('/professional_profiles', ProfilePost);
router.put('/professional_profiles/:profile_id', ProfilePut);
router.delete('/professional_profiles/:profile_id', ProfileDelete);

// education
router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);
router.get('/education/:education_id', EducationGetById);
router.post('/professional_profiles/:profile_id/education', EducationPost);
router.put('/education/:education_id', EducationPut);
router.delete('/education/:education_id', EducationDelete);

// experience
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);
router.get('/experience/:experience_id', ExperienceGetById);
router.post('/professional_profiles/:profile_id/experience', ExperiencePost);
router.put('/experience/:experience_id', ExperiencePut);
router.delete('/experience/:experience_id', ExperienceDelete);


export default router;
