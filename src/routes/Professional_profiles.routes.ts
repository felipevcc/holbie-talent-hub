import { Router } from "express";
import {
  // ProfessionalProfiles
  ProfilesGet,
  ProfileGetById,
  ProfilePost,
  ProfilePut,
  ProfileDelete,
  // ProfileEducation
  ProfileEducationGet,
  EducationGetById,
  EducationPost,
  EducationPut,
  EducationDelete,
  // ProfileExperience
  ProfileExperienceGet,
  ExperienceGetById,
  ExperiencePost,
  ExperiencePut,
  ExperienceDelete,
  // Jobs
  JobGet,
  JobPost,
  // ProfileApplications
  ProfileApplicationsGet
} from "../middleWares/Professional_profiles.middleWares";

const router = Router();

// ProfessionalProfiles
router.get('/professional_profiles', ProfilesGet);
router.get('/professional_profiles/:profile_id', ProfileGetById);
router.post('/professional_profiles', ProfilePost);
router.put('/professional_profiles/:profile_id', ProfilePut);
router.delete('/professional_profiles/:profile_id', ProfileDelete);

// ProfessionalEducation
router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);
router.get('/education/:education_id', EducationGetById);
router.post('/professional_profiles/:profile_id/education', EducationPost);
router.put('/education/:education_id', EducationPut);
router.delete('/education/:education_id', EducationDelete);

// ProfessionalExperience
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);
router.get('/experience/:experience_id', ExperienceGetById);
router.post('/professional_profiles/:profile_id/experience', ExperiencePost);
router.put('/experience/:experience_id', ExperiencePut);
router.delete('/experience/:experience_id', ExperienceDelete);

// Jobs
router.get('/professional_profiles/:profile_id/company_profiles', JobGet);
router.post('/professional_profiles/:profile_id/company_profiles', JobPost);

// ProfileApplications
router.get('/professional_profiles/:profile_id/applications', ProfileApplicationsGet);

export default router;
