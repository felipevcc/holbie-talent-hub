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
} from "../middleWares/Company_profiles.middleWares";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     CompanyProfile:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *         company_name:
 *           type: string
 *         industry:
 *           type: string
 *         about_us:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         favorite_profiles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FavoriteProfile'
 *     FavoriteProfile:
 *       type: object
 *       properties:
 *         company_id:
 *           type: integer
 *         profile_id:
 *           type: integer
 *     ProfessionalProfile:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *         first_name:
 *           type: string
 *         headline:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     CreateCompanyProfile:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         industry:
 *           type: string
 *         about_us:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *     UpdateCompanyProfile:
 *       type: object
 *       properties:
 *         company_name:
 *           type: string
 *         industry:
 *           type: string
 *         about_us:
 *           type: string
 *         location:
 *           type: string
 *         website:
 *           type: string
 *
 *   parameters:
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID del perfil
 *       required: true
 *       schema:
 *         type: integer
 *     company_id:
 *       in: path
 *       name: company_id
 *       description: ID de la empresa
 *       required: true
 *       schema:
 *         type: integer
 *     FavoriteProfile:
 *       description: Response of favorite profile
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteProfile'
 *     ProfessionalProfile:
 *       description: Response of professional profile
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfile'
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *  name: CompanyProfiles
 *  description: Endpoints to company profiles
 */

 /**
  * @swagger
  * tags:
  *   name: FavoriteProfiles
  *   description: Endpoints to favorite profiles
  */

// ===============================================================
// =========================== COMPANY ===========================
// ===============================================================

/**
 * @swagger
 * /api/company_profiles:
 *   get:
 *     summary: Get company profiles
 *     tags: [CompanyProfiles]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyProfile'
 *             example:
 *               - profile_id: 1
 *                 name: Holberton
 *                 address: Calle 5
 *                 email: info@companya.com
 *                 phone: 123456789
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *               - profile_id: 2
 *                 name: Coderise
 *                 address: Calle 6
 *                 email: info@companyb.com
 *                 phone: 987654321
 *                 created_at: "2023-06-23T12:30:00Z"
 *                 updated_at: "2023-06-23T12:30:00Z"
 *
 * /api/company_profiles/{profile_id}:
 *   get:
 *     summary: Get company profile by ID
 *     tags: [CompanyProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyProfile'
 *             example:
 *               name: Holberton
 *               address: Calle 5
 *               email: info@companya.com
 *               phone: 123456789
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *       '404':
 *         description: Company profile ID not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company profile ID not found
 *       '500':
 *         description: Failed to get company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get company profile
 *
 *   post:
 *     summary: Create company profile
 *     tags: [CompanyProfiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCompanyProfile'
 *           example:
 *             company_name: Google
 *             industry: Technology
 *             about_us: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *             location: New York, USA
 *             website: https://example.com
 *     responses:
 *       '200':
 *         description: Company profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyProfile'
 *             example:
 *               company_name: Google
 *               industry: Technology
 *               about_us: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *               location: New York, USA
 *               website: https://example.com
 *       '500':
 *         description: Failed to create company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create company profile
 *
 *   put:
 *     summary: Update company profile
 *     tags: [CompanyProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompanyProfile'
 *     responses:
 *       '200':
 *         description: Company profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyProfile'
 *             example:
 *               company_name: Google
 *               industry: Technology
 *               about_us: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *               location: New York, USA
 *               website: https://google.com
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to update company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update company profile
 *
 *   delete:
 *     summary: Delete company profile
 *     tags: [CompanyProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '204':
 *         description: Company profile deleted successfully
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to delete company profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete company profile
 */
router.get('/company_profiles', ProfilesGet);
router.get('/company_profiles/:profile_id', ProfileGetById);
router.post('/company_profiles', ProfilePost);
router.put('/company_profiles/:profile_id', ProfilePut);
router.delete('/company_profiles/:profile_id', ProfileDelete);

// ===============================================================
// =========================== FAVORIT PROFILES ==================
// ===============================================================

/**
 * @swagger
 * /api/company_profiles/{company_id}/favorite_profiles:
 *   get:
 *     summary: Get favorite profiles for a company
 *     tags: [FavoriteProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteProfile'
 *             example:
 *               - profile_id: 1
 *                 first_name: "Erick"
 *                 headline: "Software Engineer"
 *               - profile_id: 2
 *                 first_name: "John"
 *                 headline: "Software Engineer"
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to get favorite profiles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get favorite profiles
 *
 *   post:
 *     summary: Add favorite profile to a company
 *     tags: [FavoriteProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteProfile'
 *           example:
 *             profile_id: 1
 *     responses:
 *       '200':
 *         description: Favorite profile added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteProfile'
 *             example:
 *               profile_id: 1
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to add favorite profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to add favorite profile
 *
 * /company_profiles/{company_id}/favorite_profiles/{profile_id}:
 *   delete:
 *     summary: Delete favorite profile from a company
 *     tags: [FavoriteProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '204':
 *         description: Favorite profile deleted successfully
 *       '404':
 *         description: Company id or profile id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id or profile id not found
 *       '500':
 *         description: Failed to delete favorite profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete favorite profile
 */
router.get('/company_profiles/:company_id/favorite_profiles', FavoriteProfilesGet);
router.post('/company_profiles/:company_id/favorite_profiles', FavoriteProfilePost);
router.delete('/company_profiles/:company_id/favorite_profiles/:profile_id', FavoriteProfileDelete);

// ===============================================================
// ========== COMPANY_PROFESSIONAL_PROFILES (employees) ==========
// ===============================================================

/**
 * @swagger
 * /api/company_profiles/{company_id}/employees:
 *   get:
 *     summary: Get employees of a company
 *     tags: [CompanyProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessionalProfile'
 *               example:
 *                 - profile_id: 1
 *                   first_name: "John"
 *                   headline: "Software Engineer"
 *                 - profile_id: 2
 *                   first_name: "Jane"
 *                   headline: "Web Developer"
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to get employees
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get employees
 *
 *   post:
 *     summary: Add employee to a company
 *     tags: [CompanyProfiles]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfile'
 *           example:
 *             professional_profile_id: 1
 *     responses:
 *       '200':
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               professional_profile_id: 1
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to add employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to add employee
 */
router.get('/company_profiles/:company_id/employees', EmployeesGet);
router.post('/company_profiles/:company_id/employees', EmployeePost);

export default router;
