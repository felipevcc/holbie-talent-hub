import { Router } from "express";
import {
  ProfessionalContactsGet,
  ProfessionalContactGetById,
  ProfessionalContactPost,
  ProfessionalContactPut,
  CompanyContactsGet,
  CompanyContactGetById,
  CompanyContactPost,
  CompanyContactPut,
  ProjectContactsGet,
  ProjectContactGetById,
  ProjectContactPost,
  ProjectContactPut
} from "../middleWares/Contacts.middleWares";

const router = Router();

// professional_profiles contacts
router.get('/professional_profiles/:profile_id/contacts', ProfessionalContactsGet);
router.get('/professional_contacts/:contact_id', ProfessionalContactGetById);
router.post('/professional_contacts', ProfessionalContactPost);
router.put('/professional_contacts/:contact_id', ProfessionalContactPut);

// company_profiles contacts
router.get('/company_profiles/:profile_id', CompanyContactsGet);
router.get('/company_contacts/:contact_id', CompanyContactGetById);
router.post('/company_contacts', CompanyContactPost);
router.put('/company_contacts/:contact_id', CompanyContactPut);

// project contacts
router.get('/projects/:project_id/contacts', ProjectContactsGet);
router.get('/project_contacts/:contact_id', ProjectContactGetById);
router.post('/project_contacts', ProjectContactPost);
router.put('/project_contacts/:contact_id', ProjectContactPut);

export default router;
