import { Router } from "express";
import { 
  // Users
  UsersGet,
  UserGetById,
  UserPost,
  UserPut,
  UserDelete } from "../middleWares/Users.middleWares";

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
 *       example:
 *         user_id: 1
 *         first_name: "John"
 *         last_name: "Doe"
 *         email: "john.doe@example.com"
 *         password_hash: "123456"
 *         role: "ACADEMY-STUDENTS"
 *         created_at: "2021-01-01T00:00:00.000Z"
 *         updated_at: "2021-01-01T00:00:00.000Z"
 *         company_id: 1
 *         professional_id: 2
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *   parameters:
 *     user_id:
 *       in: path
 *       name: user_id
 *       description: ID del usuario
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
 *  name: Users
 *  description: Endpoints to users
 */
// ===============================================================
// ============================ USERS ============================
// ===============================================================

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Failed to get users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get users
 *
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               professional_id:
 *                 type: integer
 *           example:
 *             first_name: John
 *             last_name: Doe
 *             email: john.doe@example.com
 *             password_hash: 123456
 *             role: ACADEMY-STUDENTS
 *             company_id: 1
 *             professional_id: 2
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '500':
 *         description: Failed to create user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create user
 */

router.get('/users', UsersGet);
router.post('/users', UserPost);

/**
 * @swagger
 * /api/v1/users/{user_id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: User id not found
 *       '500':
 *         description: Failed to get user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get user
 *
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               user_id: 1
 *               first_name: "John"
 *               last_name: "Doe"
 *               email: "john.doe@example.com"
 *               password_hash: "123456"
 *               role: "ACADEMY-STUDENTS"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               professional_id: 2
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: User not found
 *       '500':
 *         description: Failed to update user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update user
 *
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     responses:
 *       '204':
 *         description: User deleted successfully
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: User not found
 *       '500':
 *         description: Failed to delete user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete user
 */
router.get('/users/:user_id', UserGetById);
router.put('/users/:user_id', UserPut);
router.delete('/users/:user_id', UserDelete);

export default router;
