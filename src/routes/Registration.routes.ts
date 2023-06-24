import { Router } from "express";
import { tempRegistrationPost, RegistrationPut } from "../middleWares/Registration.middleWares";

const router = Router();

// temporary company registration
router.post('/temp_registration', tempRegistrationPost);

// Company registration
router.put('/registration', RegistrationPut);

export default router;
