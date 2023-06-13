import { Router } from "express";
import { ProfilesGet, ProfileGetById, ProfilePost, ProfilePut, ProfileDelete } from "../middleWares/Company_profiles.middleWares";

const router = Router();

router.get('/company_profiles', ProfilesGet);
router.get('/company_profiles/:profile_id', ProfileGetById);
router.post('/company_profiles', ProfilePost);
router.put('/company_profiles/:profile_id', ProfilePut);
router.delete('/company_profiles/:profile_id', ProfileDelete);

export default router;