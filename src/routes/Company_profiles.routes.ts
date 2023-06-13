import { Router } from "express";
import { ProfilesGet,
  ProfileGetById,
  ProfilePost,
  ProfilePut,
  ProfileDelete,
  FavoriteProfilesGet,
  FavoriteProfilePost,
  FavoriteProfileDelete
} from "../middleWares/Company_profiles.middleWares";

const router = Router();

// company_profiles
router.get('/company_profiles', ProfilesGet);
router.get('/company_profiles/:profile_id', ProfileGetById);
router.post('/company_profiles', ProfilePost);
router.put('/company_profiles/:profile_id', ProfilePut);
router.delete('/company_profiles/:profile_id', ProfileDelete);

// favorite_profiles
router.get('/company_profiles/:company_id/favorite_profiles', FavoriteProfilesGet);
router.post('/company_profiles/:company_id/favorite_profiles', FavoriteProfilePost);
router.delete('/company_profiles/:company_id/favorite_profiles/:profile_id', FavoriteProfileDelete);

export default router;
