import { Router } from "express";
import {
  tempRegistrationPost,
  RegistrationPut,
  RegistrationPost
} from "../../use-cases/Registration.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password_hash:
 *           type: string
 *         role:
 *           type: string
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
 *     RegistrationPut:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *     RegistrationPost:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *   parameters:
 *     user_id:
 *       in: path
 *       name: user_id
 *       required: true
 *       description: ID of the user
 *       schema:
 *         type: integer
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *   name: Registration
 *   description: Endpoints to registration
 */

// =================================================================
// ============== TEMPORARY COMPANY USER REGISTRATION ==============
// =================================================================

/**
 * @swagger
 * /api/v1/temp_registration:
 *   post:
 *     summary: Temporary company user registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *           example:
 *             email: "alexam@coderise.com"
 *     responses:
 *       '201':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               user_id: 21
 *               first_name: null
 *               last_name: null
 *               email: "alexam@coderise.com"
 *               password_hash: "$2b$10$fj0tSN9vbg2EzCgf2xQcFe"
 *               role: "COMPANY-STAFF"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 2
 *               professional_id: null
 *       '400':
 *         description: Email is not from an enterprise domain
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Invalid email domain (public domain)
 *       '500':
 *         description: Failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to register user
 */
router.post('/temp_registration', tempRegistrationPost);

// =================================================================
// ================= COMPANY USER REGISTRATION PUT =================
// =================================================================

/**
 * @swagger
 * /api/v1/registration/{user_id}:
 *   put:
 *     summary: Company user registration after temporary registration
 *     tags: [Registration]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationPut'
 *           example:
 *             first_name: "Alexa"
 *             last_name: "Muñoz"
 *             password: "1234"
 *             role: "COMPANY-STAFF"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               user_id: 21
 *               first_name: "Alexa"
 *               last_name: "Muñoz"
 *               email: "alexam@coderise.com"
 *               password_hash: "$2b$10$fj0tSN9vbg2EzCgf2xQcFe"
 *               role: "COMPANY-STAFF"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 2
 *               professional_id: null
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: User not found
 *       '500':
 *         description: Failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to register user
 */
router.put('/registration/:user_id', RegistrationPut);

// =================================================================
// =================== COMPANY USER REGISTRATION ===================
// =================================================================

/**
 * @swagger
 * /api/v1/registration:
 *   post:
 *     summary: Company user registration
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationPost'
 *           example:
 *             first_name: "Alexa"
 *             last_name: "Muñoz"
 *             email: "alexam@coderise.com"
 *             password: "1234"
 *             role: "COMPANY-STAFF"
 *     responses:
 *       '201':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               user_id: 21
 *               first_name: "Alexa"
 *               last_name: "Muñoz"
 *               email: "alexam@coderise.com"
 *               password_hash: "$2b$10$fj0tSN9vbg2EzCgf2xQcFe"
 *               role: "COMPANY-STAFF"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 2
 *               professional_id: null
 *       '400':
 *         description: Invalid email domain (public domain)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Invalid email domain (public domain)
 *       '500':
 *         description: Failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to register user
 */
router.put('/registration', RegistrationPost);

export default router;
