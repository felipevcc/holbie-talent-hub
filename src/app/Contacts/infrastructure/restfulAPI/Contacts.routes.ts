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
} from "../../use-cases/Contacts.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfessionalProfileContact:
 *       type: object
 *       properties:
 *         contact_id:
 *           type: integer
 *         contact_type:
 *           type: string
 *         contact_info:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         profile_id:
 *           type: integer
 *
 *     CompanyContact:
 *       type: object
 *       properties:
 *         contact_id:
 *           type: integer
 *         contact_type:
 *           type: string
 *         contact_info:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         company_id:
 *           type: integer
 *
 *     ProjectContact:
 *       type: object
 *       properties:
 *         contact_id:
 *           type: integer
 *         contact_type:
 *           type: string
 *         contact_info:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         project_id:
 *           type: integer
 *
 *   parameters:
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID of the professional profile
 *       required: true
 *       schema:
 *         type: integer
 *     contact_id:
 *       in: path
 *       name: contact_id
 *       description: ID of the contact
 *       required: true
 *       schema:
 *         type: integer
 *     company_id:
 *       in: path
 *       name: company_id
 *       description: ID of the company profile
 *       required: true
 *       schema:
 *         type: integer
 *     project_id:
 *       in: path
 *       name: project_id
 *       description: ID of the project
 *       required: true
 *       schema:
 *         type: integer
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *   - name: Professional contacts
 *     description: Endpoints professional profile contacts
 *   - name: Company contacts
 *     description: Endpoints company profile contacts
 *   - name: Project contacts
 *     description: Endpoints project contacts
 */

// ===============================================================
// ================ PROFESSIONAL_PROFILE_CONTACTS ================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/contacts:
 *   post:
 *     summary: Create a contact for a professional profile
 *     tags: [Professional contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfileContact'
 *           example:
 *             contact_type: Phone
 *             contact_info: "+1234567890"
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Phone
 *               contact_info: "+1234567890"
 *               created_at: '2023-06-22T10:00:00Z'
 *               updated_at: '2023-06-22T10:00:00Z'
 *               profile_id: 123
 *       '500':
 *         description: Failed to create contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create contact
 *   get:
 *     summary: Get contacts for a professional profile
 *     tags: [Professional contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessionalProfileContact'
 *             example:
 *               - contact_id: 1
 *                 contact_type: Phone
 *                 contact_info: "+1234567890"
 *                 created_at: '2023-06-22T10:00:00Z'
 *                 updated_at: '2023-06-22T10:00:00Z'
 *                 profile_id: 123
 *               - contact_id: 2
 *                 contact_type: Email
 *                 contact_info: example@example.com
 *                 created_at: '2023-06-22T11:00:00Z'
 *                 updated_at: '2023-06-22T11:00:00Z'
 *                 profile_id: 123
 *       '404':
 *         description: Professional profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional profile not found
 *       '500':
 *         description: Failed to get contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get contacts
 */

router.get('/professional_profiles/:profile_id/contacts', ProfessionalContactsGet);
router.post('/professional_profiles/:profile_id/contacts', ProfessionalContactPost);

/**
 * @swagger
 * /api/v1/professional_contacts/{contact_id}:
 *   get:
 *     summary: Get a professional contact by ID
 *     tags: [Professional contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Phone
 *               contact_info: "+1234567890"
 *               created_at: '2023-06-22T10:00:00Z'
 *               updated_at: '2023-06-22T10:00:00Z'
 *               profile_id: 123
 *       '404':
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Contact not found
 *       '500':
 *         description: Failed to get contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get contact
 *   put:
 *     summary: Update a professional contact
 *     tags: [Professional contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfileContact'
 *           example:
 *             contact_type: Phone
 *             contact_info: "+1234567890"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Phone
 *               contact_info: "+1234567890"
 *               created_at: '2023-06-22T10:00:00Z'
 *               updated_at: '2023-06-22T10:00:00Z'
 *               profile_id: 123
 *       '404':
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Contact not found
 *       '500':
 *         description: Failed to update contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update contact
 *   delete:
 *     summary: Delete a professional contact
 *     tags: [Professional contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '204':
 *         description: Contact deleted successfully
 *       '404':
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Contact not found
 *       '500':
 *         description: Failed to delete contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete contact
 */
router.get('/professional_contacts/:contact_id', ProfessionalContactGetById);
router.put('/professional_contacts/:contact_id', ProfessionalContactPut);
router.delete('/professional_contacts/:contact_id', ProfessionalContactDelete);

// ===============================================================
// ================== COMPANY_PROFILE_CONTACTS ===================
// ===============================================================

/**
 * @swagger
 * /api/v1/company_profiles/{profile_id}/contacts:
 *   post:
 *     summary: Create a new contact for a company profile
 *     tags: [Company contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyContact'
 *           example:
 *             contact_type: Email
 *             contact_info: example@example.com
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Email
 *               contact_info: jhon@example.com
 *               created_at: '2023-06-22T12:34:56Z'
 *               updated_at: '2023-06-22T12:34:56Z'
 *               company_id: 1
 *       '500':
 *         description: Failed to create contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create contact
 *   get:
 *     summary: Get contacts for a company profile
 *     tags: [Company contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyContact'
 *             example:
 *               - contact_id: 123
 *                 contact_type: Email
 *                 contact_info: jhon@example.com
 *                 created_at: '2023-06-22T12:34:56Z'
 *                 updated_at: '2023-06-22T12:34:56Z'
 *                 comany_id: 1
 *               - contact_id: 456
 *                 contact_type: Phone
 *                 contact_info: 1234567890
 *                 created_at: '2023-06-22T12:34:56Z'
 *                 updated_at: '2023-06-22T12:34:56Z'
 *                 comany_id: 1
 * 
 *       '404':
 *         description: Company profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company profile not found
 *       '500':
 *         description: Failed to get contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get contacts
 */


router.post('/company_profiles/:profile_id/contacts', CompanyContactPost);
router.get('/company_profiles/:profile_id/contacts', CompanyContactsGet);

/**
 * @swagger
 * /api/v1/company_contacts/{contact_id}:
 *   get:
 *     summary: Get a company contact by ID
 *     tags: [Company contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyContact'
 *             example:
 *               contact_id: 1
 *               contact_type: email
 *               contact_info: Erick@example.com
 *               created_at: 2023-06-22T10:30:00Z
 *               updated_at: 2023-06-22T11:15:00Z
 *               company_id: 2
 *       '404':
 *         description: Company contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company contact not found
 *       '500':
 *         description: Failed to get company contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get company contact
 *   put:
 *     summary: Update a company contact
 *     tags: [Company contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyContact'
 *           example:
 *             contact_type: email
 *             contact_info: updated@example.com
 *     responses:
 *       '200':
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyContact'
 *             example:
 *               contact_id: 1
 *               contact_type: email
 *               contact_info: updated@example.com
 *               created_at: '2023-06-22T12:34:56Z'
 *               updated_at: '2023-06-22T12:34:56Z'
 *               company_id: 1
 *       '404':
 *         description: Company contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company contact not found
 *       '500':
 *         description: Failed to update contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update contact
 *   delete:
 *     summary: Delete a company contact
 *     tags: [Company contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '204':
 *         description: Contact deleted successfully
 *       '404':
 *         description: Company contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company contact not found
 *       '500':
 *         description: Failed to delete contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete contact
 */
router.get('/company_contacts/:contact_id', CompanyContactGetById);
router.put('/company_contacts/:contact_id', CompanyContactPut);
router.delete('/company_contacts/:contact_id', CompanyContactDelete);

// ===============================================================
// ====================== PROJECT_CONTACTS =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/projects/{project_id}/contacts:
 *   post:
 *     summary: Create a new contact for a project
 *     tags: [Project contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectContact'
 *           example:
 *             contact_type: Email
 *             contact_info: example@example.com
 *     responses:
 *       '201':
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Email
 *               contact_info: example@example.com
 *               created_at: '2023-06-22T12:34:56Z'
 *               updated_at: '2023-06-22T12:34:56Z'
 *               project_id: 1
 *       '500':
 *         description: Failed to create contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create contact
 *   get:
 *     summary: Get contacts for a project
 *     tags: [Project contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectContact'
 *             example:
 *               - contact_id: 1
 *                 contact_type: Email
 *                 contact_info: example@example.com
 *                 created_at: '2023-06-22T12:34:56Z'
 *                 updated_at: '2023-06-22T12:34:56Z'
 *                 project_id: 1
 *               - contact_id: 1
 *                 contact_type: Phone
 *                 contact_info: "1234567890"
 *                 created_at: '2023-06-22T12:34:56Z'
 *                 updated_at: '2023-06-22T12:34:56Z'
 *                 project_id: 1
 *       '404':
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project not found
 *       '500':
 *         description: Failed to get contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get contacts
 */

router.post('/projects/:project_id/contacts', ProjectContactPost);
router.get('/projects/:project_id/contacts', ProjectContactsGet);

/**
 * @swagger
 * /api/v1/project_contacts/{contact_id}:
 *   get:
 *     summary: Get a project contact by ID
 *     tags: [Project contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Email
 *               contact_info: example@example.com
 *               created_at: '2023-06-22T12:34:56Z'
 *               updated_at: '2023-06-22T12:34:56Z'
 *               project_id: 1
 *       '404':
 *         description: Project contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project contact not found
 *       '500':
 *         description: Failed to get project contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get project contact
 *   put:
 *     summary: Update a project contact
 *     tags: [Project contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectContact'
 *           example:
 *              contact_type: Email
 *              contact_info: updated@example.com
 *     responses:
 *       '200':
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectContact'
 *             example:
 *               contact_id: 1
 *               contact_type: Email
 *               contact_info: updated@example.com
 *               created_at: '2023-06-22T12:34:56Z'
 *               updated_at: '2023-06-22T12:34:56Z'
 *               project_id: 1
 *       '404':
 *         description: Project contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project contact not found
 *       '500':
 *         description: Failed to update contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update contact
 *   delete:
 *     summary: Delete a project contact
 *     tags: [Project contacts]
 *     parameters:
 *       - $ref: '#/components/parameters/contact_id'
 *     responses:
 *       '204':
 *         description: Contact deleted successfully
 *       '404':
 *         description: Project contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project contact not found
 *       '500':
 *         description: Failed to delete contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete contact
 */
router.get('/project_contacts/:contact_id', ProjectContactGetById);
router.put('/project_contacts/:contact_id', ProjectContactPut);
router.delete('/project_contacts/:contact_id', ProjectContactDelete);

export default router;
