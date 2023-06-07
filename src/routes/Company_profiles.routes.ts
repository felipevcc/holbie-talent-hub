import { Router } from "express";
import { Company_profilesGet } from "../middleWares/Company_profiles.middleWares";

const router = Router();

router.get('/company_profiles', Company_profilesGet);

export default router;