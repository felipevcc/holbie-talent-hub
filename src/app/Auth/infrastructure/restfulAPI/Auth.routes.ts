import { Router } from "express";
import { Login } from "../../use-cases/Auth.use-case";

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
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Endpoint to login
 */

// =================================================================
// ============================= LOGIN =============================
// =================================================================

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *           example:
 *             email: alexam@gmail.com
 *             password: "1234"
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
 *               email: "alexam@gmail.com"
 *               password_hash: "$2b$10$fj0tSN9vbg2EzCgf2xQcFe"
 *               role: "ACADEMY-STUDENTS"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: null
 *               professional_id: 18
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Invalid credentials
 *       '500':
 *         description: Failed to login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to login
 */
router.post('/login', Login);

export default router;
