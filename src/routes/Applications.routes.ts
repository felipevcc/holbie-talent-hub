import { Router } from "express";
import {
  // Application
  CompanyApplicationsGet,
  ProfileApplicationsGet,
  ApplicationGetById,
  ApplicationPost,
  ApplicationPut,
  ApplicationDelete
} from "../middleWares/Applications.middleWares";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         application_id:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, REJECTED, FINISHED]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         company_id:
 *           type: integer
 *         professional_id:
 *           type: integer
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     UpdateApplication:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, REJECTED, FINISHED]
 *     CreateApplication:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PENDING, IN_PROGRESS, REJECTED, FINISHED]
 *         company_id:
 *           type: integer
 *         professional_id:
 *           type: integer
 *
 *   parameters:
 *     application_id:
 *       in: path
 *       name: application_id
 *       description: ID of the application
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
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID of the profile
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
 *   name: Applications
 *   description: Endpoints to applications
 */

// ===============================================================
// ========================= APPLICATION =========================
// ===============================================================

/**
 * @swagger
 * /api/v1/company_profiles/{company_id}/applications:
 *   get:
 *     summary: Get applications from a company
 *     tags: [Applications]
 *     parameters:
 *       - $ref: '#/components/parameters/company_id'
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *             example:
 *               application_id: 1
 *               status: "PENDING"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               professional_id: 2
 *       '404':
 *         description: Company id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company id not found
 *       '500':
 *         description: Failed to get applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get applications
 */
router.get('/company_profiles/:company_id/applications', CompanyApplicationsGet);

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/applications:
 *   get:
 *     summary: Get applications from a profile
 *     tags: [Applications]
 *     parameters:
 *        - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *             example:
 *               application_id: 1
 *               status: "PENDING"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               professional_id: 2
 *       '404':
 *         description: porfile id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Profile id not found
 *       '500':
 *         description: Failed to get applications
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get applications
 */
router.get('/professional_profiles/:profile_id/applications', ProfileApplicationsGet);

/**
 * @swagger
 * /api/v1/applications/{application_id}:
 *   get:
 *     summary: Get application by id
 *     tags: [Applications]
 *     parameters:
 *       - $ref: '#/components/parameters/application_id'
 *     responses:
 *       '200':
 *         description: Succesful operation
 *         content:
 *           application/json:
 *             example:
 *               application_id: 1
 *               status: "PENDING"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               professional_id: 2
 *       '404':
 *         description: Application id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Application id not found
 *       '500':
 *         description: Failed to get application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get application
 */
router.get('/applications/:application_id', ApplicationGetById);

/**
 * @swagger
 * /api/v1/applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateApplication'
 *           example:
 *             status: "PENDING"
 *             company_id: 1
 *             professional_id: 2
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       '500':
 *         description: Failed to create application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create application
 */
router.post('/applications', ApplicationPost);

/**
 * @swagger
 * /api/v1/applications/{application_id}:
 *   put:
 *     summary: update application
 *     tags: [Applications]
 *     parameters:
 *       - $ref: '#/components/parameters/application_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateApplication'
 *           example:
 *             status: "FINISHED"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             example:
 *               application_id: 1
 *               status: "FINISHED"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               professional_id: 2
 *       '404':
 *         description: Application id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Application id not found
 *       '500':
 *         description: Failed to update application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update application
 */
router.put('/applications/:application_id', ApplicationPut);

/**
 * @swagger
 * /api/v1/applications/{application_id}:
 *   delete:
 *     summary: Delete application
 *     tags: [Applications]
 *     parameters:
 *       - $ref: '#/components/parameters/application_id'
 *     responses:
 *       '204':
 *         description: No Content
 *       '404':
 *         description: Application id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Application id not found
 *       '500':
 *         description: Failed to delete application
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete application
 */
router.delete('/applications/:application_id', ApplicationDelete);

export default router;
