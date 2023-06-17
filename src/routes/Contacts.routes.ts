import { Router } from "express";
import {
  // ProfessionalProfileContacts
  ProfessionalContactsGet,
  ProfessionalContactGetById,
  ProfessionalContactPost,
  ProfessionalContactPut,
  ProfessionalContactDelete,
  // CompanyProfilesContacts
  CompanyContactsGet,
  CompanyContactGetById,
  CompanyContactPost,
  CompanyContactPut,
  CompanyContactDelete,
  // ProjectContacts
  ProjectContactsGet,
  ProjectContactGetById,
  ProjectContactPost,
  ProjectContactPut,
  ProjectContactDelete
} from "../middleWares/Contacts.middleWares";

const router = Router();

// ProfessionalProfileContacts
router.get('/professional_profiles/:profile_id/contacts', ProfessionalContactsGet);
router.get('/professional_contacts/:contact_id', ProfessionalContactGetById);
router.post('/professional_profiles/:profile_id/contacts', ProfessionalContactPost);
router.put('/professional_contacts/:contact_id', ProfessionalContactPut);
router.delete('/professional_contacts/:contact_id', ProfessionalContactDelete);

// CompanyProfilesContacts
router.get('/company_profiles/:profile_id/contacts', CompanyContactsGet);
router.get('/company_contacts/:contact_id', CompanyContactGetById);
router.post('/company_profiles/:profile_id/contacts', CompanyContactPost);
router.put('/company_contacts/:contact_id', CompanyContactPut);
router.delete('/company_contacts/:contact_id', CompanyContactDelete);

// ProjectContacts
router.get('/projects/:project_id/contacts', ProjectContactsGet);
router.get('/project_contacts/:contact_id', ProjectContactGetById);
router.post('/projects/:project_id/contacts', ProjectContactPost);
router.put('/project_contacts/:contact_id', ProjectContactPut);
router.delete('/project_contacts/:contact_id', ProjectContactDelete);

export default router;
