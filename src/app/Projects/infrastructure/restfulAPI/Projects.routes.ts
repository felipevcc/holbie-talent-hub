import { Router } from "express";
import {
  // Projects
  ProjectGetById,
  ProjectPost,
  ProjectPut,
  ProjectDelete,
  // ProfessionalProfiles - Collaborators
  ProjectCollaboratorsGet,
  ProjectCollaboratorsPost,
  // Profiles - Projects
  ProfileProjectsGet,
  // Capstones
  CompanyCapstonesGet,
  CapstoneGetById,
  CapstonePost,
  CapstonePut
 } from "../../use-cases/Projects.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         project_id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         repository:
 *           type: string
 *         website:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         project_id: 1
 *         title: "Project Title"
 *         description: "Project Description"
 *         repository: "https://github.com/project"
 *         website: "https://project.com"
 *         start_date: "2022-01-01"
 *         end_date: "2022-12-31"
 *         created_at: "2022-01-01T00:00:00.000Z"
 *         updated_at: "2022-01-01T00:00:00.000Z"
 *
 *     ProfessionalProfileProject:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *         project_id:
 *           type: integer
 *       example:
 *         profile_id: 1
 *         project_id: 1
 *
 *     CompanyCapstoneProject:
 *       type: object
 *       properties:
 *         company_id:
 *           type: integer
 *         project_id:
 *           type: integer
 *         kind:
 *           type: string
 *         active:
 *           type: boolean
 *     
 *     CollaboratorsResponse:
 *       type: object
 *       properties:
 *         collaborators:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Collaborator'
 *       example:
 *           - profile_id: 1
 *             is_user: 1,
 *             headline: Web Developer,
 *             about_me: Experienced web developer with a passion for front-end development.,
 *             location: San Francisco, CA,
 *             job_name: Full Stack Developer,
 *             kind_job: REMOTE,
 *             job_type: FULL_TIME,
 *             salary_min: 8000,
 *             salary_max: 10000,
 *             created_at: 2023-06-28T01:14:59.000Z,
 *             updated_at: 2023-06-28T01:14:59.000Z
 *           - profile_id: 2
 *             is_user: 1,
 *             headline: Backend Developer,
 *             about_me: Passionate about programming and web development, with experience in backend development using Python and Node.js, using frameworks such as Django, Flask, and Express. I am a developer focused on creating robust and efficient solutions, and I am excited to learn and grow in a challenging environment.,
 *             location: Cali, Colombia,
 *             job_name: Backend Developer,
 *             kind_job: REMOTE,
 *             job_type: FULL_TIME,
 *             salary_min: 8000,
 *             salary_max: 10000,
 *             created_at: 2023-07-03T22:08:11.000Z,
 *             updated_at: 2023-07-03T22:08:11.000Z
 *     Collaborator:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         role:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *   parameters:
 *     project_id:
 *       in: path
 *       name: project_id
 *       description: ID of the project
 *       required: true
 *       schema:
 *         type: integer
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID of the professional profile
 *       required: true
 *       schema:
 *         type: integer
 *     company_id:
 *       in: path
 *       name: company_id
 *       description: ID of the company
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
 *   - name: Projects
 *     description: Projects Endpoints
 *   - name: Collaborators
 *     description: Collaborators Endpoints
 *   - name: Profiles Projects
 *     description: Profiles - Projects Endpoints
 *   - name: Capstones
 *     description: Capstones Endpoints
 */

// ===============================================================
// ========================= PROJECTS ============================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/projects:
 *   post:
 *     summary: Create a new project for a professional profile
 *     tags: [Projects]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       description: Date of the new project
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               title: "Project Title"
 *               description: "Project Description"
 *               repository: "https://github.com/project"
 *               website: "https://project.com"
 *               start_date: "2022-01-01"
 *               end_date: "2022-12-31"
 *     responses:
 *       200:
 *         description: successfull operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       500:
 *         description: Failed to create project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example: Failed to create project
 */
router.post('/professional_profiles/:profile_id/projects', ProjectPost);

/**
 * @swagger
 * /api/v1/projects/{project_id}:
 *   get:
 *     summary: Get a project by id
 *     tags: [Projects]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       200:
 *         description: successfull operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project id not found
 *       500:
 *         description: Failed to get project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get project
 *   put:
 *     summary: Update a project by id
 *     tags: [Projects]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     requestBody:
 *       description: Data of the project to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *           example:
 *             title: "Project Title"
 *             description: "Project Description"
 *             repository: "https://github.com/project/updated"
 *             website: "https://project.com"
 *             start_date: "2022-01-01"
 *             end_date: "2022-12-31"
 *     responses:
 *       200:
 *         description: successfull operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project/updated'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project not found
 *       500:
 *         description: Failed to update project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update project
 *   delete:
 *     summary: Delete a project by id
 *     tags: [Projects]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       204:
 *        description: No content
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project not found
 *       500:
 *         description: Failed to delete project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete project
 */
router.get('/projects/:project_id', ProjectGetById);
router.put('/projects/:project_id', ProjectPut);
router.delete('/projects/:project_id', ProjectDelete);

// ===============================================================
// ====================== COLLABORATORS ==========================
// ===============================================================

/**
 * @swagger
 * /api/v1/projects/{project_id}/collaborators:
 *   get:
 *     summary: Get all collaborators of a project by id
 *     tags: [Collaborators]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       200:
 *         description: successfull operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CollaboratorsResponse'
 *       404:
 *         description: Project id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project id not found
 *       500:
 *         description: Failed to get collaborators
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get collaborators
 *
 *   post:
 *     summary: Create a new collaborator for a project
 *     tags: [Collaborators]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     requestBody:
 *       description: Data of the new collaborator
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collaborator'
 *           example:
 *             profile_id: 1
 *     responses:
 *       201:
 *         description: successfull operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collaborator'
 *             example:
 *               profile_id: 1
 *               project_id: 1
 *       500:
 *         description: Failed to create collaborator
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create collaborator
 */
router.get('/projects/:project_id/collaborators',ProjectCollaboratorsGet);
router.post('/projects/:project_id/collaborators', ProjectCollaboratorsPost);

// ===============================================================
// ==================== PROFILES - PROJECTS ======================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/projects:
 *   get:
 *     summary: Get projects by professional profile ID
 *     tags: [Profiles Projects]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: Professional profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional profile not found
 *       500:
 *         description: Failed to get projects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get projects
 */

router.get('/professional_profiles/:profile_id/projects', ProfileProjectsGet);

// ===============================================================
// ========================== CAPSTONE ===========================
// ===============================================================

/**
 * @swagger
 * /api/v1/company_profiles/{company_id}/capstones:
 *   get:
 *     summary: Get all capstones of a company profile by ID
 *     tags: [Capstones]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CompanyCapstoneProject'
 *               example:
 *                 company_id: 1
 *                 project_id: 1
 *                 kind: "Backend"
 *                 active: true
 *       404:
 *         description: Company profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company profile not found
 *       500:
 *         description: Failed to get capstones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get capstones
 */
router.get('/company_profiles/:company_id/capstones', CompanyCapstonesGet);

/**
 * @swagger
 * /api/v1/company_profiles/{company_id}/capstones:
 *   post:
 *     summary: Create a new capstone for a company profile
 *     tags: [Capstones]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     requestBody:
 *       description: Data of the new capstone
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyCapstoneProject'
 *           example:
 *             project_id: 1
 *             kind: "Backend"
 *             active: true
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/CompanyCapstoneProject'
 *             example:
 *               company_id: 1
 *               project_id: 1
 *               kind: "Backend"
 *               active: true
 *       404:
 *         description: Company profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company profile not found
 *       500:
 *         description: Failed to create capstone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create capstone
 */

router.post('/company_profiles/:company_id/capstones', CapstonePost);

/**
 * @swagger
 * /api/v1/company_profiles/{company_id}/capstones/{project_id}:
 *   get:
 *     summary: Get a specific capstone by project ID and company profile ID
 *     tags: [Capstones]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/CompanyCapstoneProject'
 *             example:
 *               company_id: 1
 *               project_id: 1
 *               kind: "Backend"
 *               active: true
 *       404:
 *         description: Capstone not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Capstone not found
 *       500:
 *         description: Failed to get capstone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get capstone
 */

router.get('/company_profiles/:company_id/capstones/:project_id', CapstoneGetById);

/**
 * @swagger
 * /api/v1/company_profiles/{company_id}/capstones/{project_id}:
 *   put:
 *     summary: Update a specific capstone by project ID and company profile ID
 *     tags: [Capstones]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *       - $ref: '#/components/parameters/project_id'
 *     requestBody:
 *       description: Updated data of the capstone
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyCapstoneProject'
 *           example:
 *             kind: "Backend"
 *             active: false
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/CompanyCapstoneProject'
 *             example:
 *               company_id: 1
 *               project_id: 1
 *               kind: "Backend"
 *               active: false
 *       404:
 *         description: Capstone not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Capstone not found
 *       500:
 *         description: Failed to update capstone
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update capstone
 */

router.put('/company_profiles/:company_id/capstones/:project_id', CapstonePut);

export default router;
