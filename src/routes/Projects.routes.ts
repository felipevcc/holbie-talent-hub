import { Router } from "express";
import {
  // Projects
  ProjectGetById,
  ProjectPost,
  ProjectPut,
  ProjectDelete,
  // ProfessionalProfiles - Collaborators
  ProjectCollaboratorsGet,
  ProjectCollaboratorsPost,
  // Profiles - Projects
  ProfileProjectsGet,
  // Capstones
  CompanyCapstonesGet,
  CapstoneGetById,
  CapstonePost,
  CapstonePut
 } from "../middleWares/Projects.middleWares";

const router = Router();

// Projects
router.post('/professional_profiles/:profile_id/projects', ProjectPost);
router.get('/projects/:project_id', ProjectGetById);
router.put('/projects/:project_id', ProjectPut);
router.delete('/projects/:project_id', ProjectDelete);

// ProfessionalProfiles - Collaborators
router.get('/projects/:project_id/collaborators',ProjectCollaboratorsGet);
router.post('/projects/:project_id/collaborators', ProjectCollaboratorsPost);

// Profiles - Projects
router.get('/professional_profiles/:profile_id/projects', ProfileProjectsGet);

// Capstones
router.get('/company_profiles/:company_id/capstones', CompanyCapstonesGet);
router.get('/company_profiles/:company_id/capstones/:project_id', CapstoneGetById);
router.post('/company_profiles/:company_id/capstones', CapstonePost);
router.put('/company_profiles/:company_id/capstones/:project_id', CapstonePut);

export default router;
