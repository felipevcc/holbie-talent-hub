import { Router } from "express";
import {
  // Ratings
  RatingGetById, 
  RatingPut, 
  // Users - Ratings
  UserSentRatingsGet,
  RatingPost,
  UserReceivedRatingsGet,
  // Projects - Ratings
  ProjectRatingGetById,
  ProjectRatingPut,
  // Company (sent ratings)
  CompanySentRatingsGet,
  CompanyRatingPost,
  // Project (received ratings)
  ProjectReceivedRatingsGet
} from "../middleWares/Ratings.middleWares";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         rating_id:
 *           type: integer
 *         positive_rating:
 *           type: boolean
 *         comment:
 *           type: string
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
 *     ProjectRating:
 *       type: object
 *       properties:
 *         rating_id:
 *           type: integer
 *         positive_rating:
 *           type: boolean
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         company_id:
 *           type: integer
 *         project_id:
 *           type: integer
 *     ProfileRating:
 *       type: object
 *       properties:
 *         rating_id:
 *           type: integer
 *         positive_rating:
 *           type: boolean
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         sender_id:
 *           type: integer
 *         profile_id:
 *           type: integer
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *
 *   parameters:
 *     rating_id:
 *       in: path
 *       name: rating_id
 *       description: Value of the rating id
 *       required: true
 *       schema:
 *         type: integer
 *     user_id:
 *       in: path
 *       name: user_id
 *       description: User id
 *       required: true
 *       schema:
 *         type: integer
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: Profile id
 *       required: true
 *       schema:
 *         type: integer
 *     project_id:
 *       in: path
 *       name: project_id
 *       description: Project id
 *       required: true
 *       schema:
 *         type: integer
 *
 *     ProjectRating:
 *       description: Response of project rating
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectRating'
 *     ProfileRating:
 *       description: Response of profile rating
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRating'
 */


// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *   - name: Ratings
 *     description: Ratings endpoints
 *   - name: Users Ratings
 *     description: Users Ratings endpoints
 *   - name: Company Projects Ratings
 *     description: Projects Ratings endpoints and Company (sent ratings - received)
 */

// ===============================================================
// ============================ RATINGS ==========================
// ===============================================================

/**
 * @swagger
 * /api/v1/profile_ratings/{rating_id}:
 *   get:
 *     summary: Get profile rating by id
 *     tags: [Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/rating_id'
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               sender_id: 1
 *               profile_id: 2
 *       '404':
 *         description: Rating id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Rating id not found
 *       '500':
 *         description: Failed to get rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get rating
 *   put:
 *     summary: Update profile rating by id
 *     tags: [Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/rating_id'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRating'
 *           example:
 *             comment: "bad profile"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               sender_id: 1
 *               profile_id: 2
 *       '404':
 *         description: User id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: User id not found
 *       '500':
 *         description: Failed to update rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update rating
 */
router.get('/profile_ratings/:rating_id', RatingGetById);
router.put('/profile_ratings/:rating_id', RatingPut);

// ===============================================================
// ======================= USERS - RATINGS =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/users/{user_id}/ratings/sent:
 *   get:
 *     summary: Get ratings sent by user
 *     tags: [Users Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               sender_id: 1
 *               profile_id: 2
 *       '404':
 *         description: Rating id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Rating id not found
 *       '500':
 *         description: Failed to get ratings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get ratings
 *
 *   post:
 *     summary: Create a new rating
 *     tags: [Users Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRating'
 *           example:
 *             positive_rating: true
 *             comment: "Great work!"
 *             receiver_id: 2
 *     responses:
 *       '201':
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             example:
 *               rating_id: 1
 *               positive_rating: true
 *               comment: "Great work!"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               sender_id: 1
 *               receiver_id: 2
 *       '500':
 *         description: Failed to create rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create rating
 */
router.get('/users/:user_id/ratings/sent', UserSentRatingsGet);
router.post('/users/:user_id/ratings/sent', RatingPost);

/**
 * @swagger
 * /api/v1/users/{user_id}/ratings/received:
 *   get:
 *     summary: Get ratings received by user
 *     tags: [Users Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/user_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               sender_id: 1
 *               profile_id: 2
 *       '500':
 *         description: Failed to get ratings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get ratings
 */
router.get('/users/:user_id/ratings/received', UserReceivedRatingsGet);

// ===============================================================
// ===================== PROJECT - RATINGS =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/project_ratings/{rating_id}:
 *   get:
 *     summary: Get project rating by id
 *     tags: [Company Projects Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/rating_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               project_id: 2
 *       '404':
 *         description: Rating id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Rating id not found
 *       '500':
 *         description: Failed to get rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get rating
 *
 *   put:
 *     summary: Update project rating by id
 *     tags: [Company Projects Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/rating_id'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectRating'
 *           example:
 *             comment: "bad project"
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad project"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               project_id: 2
 *       '404':
 *         description: Rating id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Rating id not found
 *       '500':
 *         description: Failed to update rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update rating
 */
router.get('/project_ratings/:rating_id/', ProjectRatingGetById);
router.put('/project_ratings/:rating_id/', ProjectRatingPut);

// ===============================================================
// ===================== COMPANY - RATINGS =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/company_profiles/{profile_id}/ratings:
 *   get:
 *     summary: Get sent ratings by company profile id
 *     tags: [Company Projects Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfileRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               project_id: 2
 *       '404':
 *         description: Company profile id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Company profile id not found
 *       '500':
 *         description: Failed to get ratings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get ratings
 *
 *   post:
 *     summary: Create a new rating for a company profile
 *     tags: [Company Projects Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileRating'
 *           example:
 *             positive_rating: false
 *             comment: "bad profile"
 *             project_id: 2
 *     responses:
 *       '201':
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               project_id: 2
 *       '500':
 *         description: Failed to create rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create rating
 */
router.get('/company_profiles/:profile_id/ratings', CompanySentRatingsGet);
router.post('/company_profiles/:profile_id/ratings', CompanyRatingPost);

/**
 * @swagger
 * /api/v1/projects/{project_id}/ratings:
 *   get:
 *     summary: Get received ratings by project id
 *     tags: [Company Projects Ratings]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectRating'
 *             example:
 *               rating_id: 1
 *               positive_rating: false
 *               comment: "bad profile"
 *               created_at: "2021-01-01T00:00:00.000Z"
 *               updated_at: "2021-01-01T00:00:00.000Z"
 *               company_id: 1
 *               project_id: 2
 *       '404':
 *         description: Project id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project id not found
 *       '500':
 *         description: Failed to get ratings
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get ratings
 */
router.get('/projects/:project_id/ratings', ProjectReceivedRatingsGet);

export default router;
