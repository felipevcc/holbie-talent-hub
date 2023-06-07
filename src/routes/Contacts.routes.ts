import { Router } from "express";
import { ContactsGet } from "../middleWares/Contacts.middleWares";

const router = Router();

router.get('/contacts', ContactsGet);

export default router;