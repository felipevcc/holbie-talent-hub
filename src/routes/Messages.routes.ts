import { Router } from "express";
import {
  // Message
  MessageGetById,
  MessagePost,
  MessagePut,
  // UserMessages
  UserSentMessagesGet,
  UserReceivedMessagesGet
} from "../middleWares/Messages.middleWares";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         message_id:
 *           type: integer
 *         subject:
 *           type: string
 *         content:
 *           type: string
 *         type_connection:
 *           type: string
 *           enum: [COMPANY, PROJECT]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         sender_id:
 *           type: integer
 *         receiver_id:
 *           type: integer
 *         application_id:
 *           type: integer
 *           nullable: true
 *         project_id:
 *           type: integer
 *           nullable: true
 *       example:
 *         message_id: 1
 *         subject: "Subject"
 *         content: "Content"
 *         type_connection: "COMPANY"
 *         created_at: "2021-01-01T00:00:00.000Z"
 *         updated_at: "2021-01-01T00:00:00.000Z"
 *         sender_id: 1
 *         receiver_id: 2
 *         application_id: 1
 *         project_id: null
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     UpdateMessage:
 *       type: object
 *       properties:
 *         subject:
 *           type: string
 *         content:
 *           type: string
 *     CreateMessage:
 *       type: object
 *       properties:
 *         subject:
 *           type: string
 *         content:
 *           type: string
 *         type_connection:
 *           type: string
 *           enum: [COMPANY, PROJECT]
 *         receiver_id:
 *           type: integer
 *         application_id:
 *           type: integer
 *           nullable: true
 *         project_id:
 *           type: integer
 *           nullable: true
 *       example:
 *         subject: "Subject"
 *         content: "Content"
 *         type_connection: "COMPANY"
 *         receiver_id: 2
 *         application_id: 1
 *
 *   parameters:
 *     message_id:
 *       in: path
 *       name: message_id
 *       description: ID of the message
 *       required: true
 *       schema:
 *         type: string
 *     user_id:
 *       in: path
 *       name: user_id
 *       description: ID of the user
 *       required: true
 *       schema:
 *         type: string
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: Messages endpoints by ID
 */

/**
 * @swagger
 * tags:
 *  name: User messages
 *  description: User Messages endpoints
 */

// ===============================================================
// =========================== MESSAGES ==========================
// ===============================================================

/**
 * @swagger
 * /api/v1/messages/{message_id}:
 *   get:
 *     summary: Get a message by ID
 *     tags: [Messages]
 *     parameters:
 *       - $ref: '#/components/parameters/message_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Message id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Message id not found"
 *       '500':
 *         description: Failed to get message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Failed to get message"
 */
router.get('/messages/:message_id', MessageGetById);

/**
 * @swagger
 * /api/v1/messages/{message_id}:
 *   put:
 *     summary: Update a message
 *     tags: [Messages]
 *     parameters:
 *       - $ref: '#/components/parameters/message_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMessage'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '404':
 *         description: Message id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Message id not found"
 *       '500':
 *         description: Failed to update message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Failed to update message"
 */
router.put('/messages/:message_id', MessagePut);

// ===============================================================
// ======================= USER - MESSAGES =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/users/{user_id}/messages/sent:
 *   get:
 *     summary: Get all sent messages by user ID
 *     tags: [User messages]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '404':
 *         description: User id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "User id not found"
 *       '500':
 *         description: Failed to get user's sent messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Failed to get user's sent messages"
 */
router.get('/users/:user_id/messages/sent', UserSentMessagesGet);

/**
 * @swagger
 * /api/v1/users/{user_id}/messages/sent:
 *   post:
 *     summary: Create a new message
 *     tags: [User messages]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMessage'
 *     responses:
 *       '201':
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '500':
 *         description: Failed to create message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Failed to create message"
 */
router.post('/users/:user_id/messages/sent', MessagePost);

/**
 * @swagger
 * /api/v1/users/{user_id}/messages/received:
 *   get:
 *     summary: Get all received messages by user ID
 *     tags: [User messages]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *    
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       '404':
 *         description: User id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "User id not found"
 *       '500':
 *         description: Failed to get user's received messages
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: "Failed to get user's received messages"
 */
router.get('/users/:user_id/messages/received', UserReceivedMessagesGet);

export default router;
