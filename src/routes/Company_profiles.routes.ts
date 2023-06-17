import { Router } from "express";
import { 
  // CompanyProfiles
  ProfilesGet,
  ProfileGetById,
  ProfilePost,
  ProfilePut,
  ProfileDelete,
  // FavoriteProfiles
  FavoriteProfilesGet,
  FavoriteProfilePost,
  FavoriteProfileDelete,
  // Employees
  EmployeesGet,
  EmployeePost,
  // CompanyApplications
  CompanyApplicationsGet,
} from "../middleWares/Company_profiles.middleWares";

const router = Router();

// CompanyProfiles
router.get('/company_profiles', ProfilesGet);
router.get('/company_profiles/:profile_id', ProfileGetById);
router.post('/company_profiles', ProfilePost);
router.put('/company_profiles/:profile_id', ProfilePut);
router.delete('/company_profiles/:profile_id', ProfileDelete);

// FavoriteProfiles
router.get('/company_profiles/:company_id/favorite_profiles', FavoriteProfilesGet);
router.post('/company_profiles/:company_id/favorite_profiles', FavoriteProfilePost);
router.delete('/company_profiles/:company_id/favorite_profiles/:profile_id', FavoriteProfileDelete);

// Employees
router.get('/company_profiles/:company_id/professional_profiles', EmployeesGet);
router.post('/company_profiles/:company_id/professional_profiles', EmployeePost);

// CompanyApplications
router.get('/company_profiles/:company_id/applications', CompanyApplicationsGet);

export default router;
