import { Router } from "express";
import { ProfessionalContactsGet, ProfessionalContactGet } from "../middleWares/Contacts.middleWares";

const router = Router();

router.get('/professional_profiles/:profile_id/contacts', ProfessionalContactsGet);
router.get('/professional_contacts/:contact_id', ProfessionalContactGet);

export default router;