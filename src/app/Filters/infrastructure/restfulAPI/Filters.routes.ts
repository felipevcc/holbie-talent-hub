import { Router } from "express";
import { FakeProfilesGet, PopularFiltersGet, FiltersPost, SearchEnginePost } from "$Filters/use-cases/Filters.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     FakeProfile:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *         location:
 *           type: string
 *         job_name:
 *           type: string
 *         kind_job:
 *           type: string
 *           enum: [REMOTE, ONSITE, BOTH]
 *         job_type:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, VOLUNTEER, OTHER]
 *         skills:
 *           type: array
 *           items:
 *             type: integer
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     Filters:
 *       type: object
 *       properties:
 *         company_id:
 *           type: integer
 *         location:
 *           type: string
 *         job_name:
 *           type: string
 *         kind_job:
 *           type: string
 *           enum: [REMOTE, ONSITE, BOTH]
 *         job_type:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, VOLUNTEER, OTHER]
 *         skills:
 *           type: array
 *           items:
 *             type: integer
 *     ProfessionalProfile:
 *       type: object
 *       properties:
 *         profile_id:
 *           type: integer
 *         is_user:
 *           type: boolean
 *         headline:
 *           type: string
 *         about_me:
 *           type: string
 *         location:
 *           type: string
 *         job_name:
 *           type: string
 *         kind_job:
 *           type: string
 *           enum: [REMOTE, ONSITE, BOTH]
 *         job_type:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, INTERNSHIP, CONTRACT, VOLUNTEER, OTHER]
 *         salary_min:
 *           type: integer
 *         salary_max:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *   name: Filters
 *   description: Endpoints to filters
 */

// =================================================================
// ========================= FAKE PROFILES =========================
// =================================================================

/**
 * @swagger
 * /api/v1/fake_profiles:
 *   get:
 *     summary: Get all fake profiles
 *     tags: [Filters]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FakeProfile'
 *             example:
 *               - profile_id: 1
 *                 location: "Madrid"
 *                 job_name: "Backend Developer"
 *                 kind_job: "REMOTE"
 *                 job_type: "FULL_TIME"
 *                 skills: [1, 3, 4]
 *               - profile_id: 2
 *                 location: "Cali"
 *                 job_name: "Frontend Developer"
 *                 kind_job: "BOTH"
 *                 job_type: "FULL_TIME"
 *                 skills: [2, 5, 6]
 *       '500':
 *         description: Failed to get fake profiles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get fake profiles
 */
router.get('/fake_profiles', FakeProfilesGet);

// =================================================================
// ============= MOST POPULAR FAKE PROFILES (FILTERS) ==============
// =================================================================

/**
 * @swagger
 * /api/v1/popular_filters:
 *   get:
 *     summary: Get the most popular fake profiles (filters)
 *     tags: [Filters]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FakeProfile'
 *             example:
 *               - profile_id: 1
 *                 location: "Madrid"
 *                 job_name: "Backend Developer"
 *                 kind_job: "REMOTE"
 *                 job_type: "FULL_TIME"
 *                 skills: [1, 3, 4]
 *               - profile_id: 2
 *                 location: "Cali"
 *                 job_name: "Frontend Developer"
 *                 kind_job: "BOTH"
 *                 job_type: "FULL_TIME"
 *                 skills: [2, 5, 6]
 *               - profile_id: 3
 *                 location: "Medellin"
 *                 job_name: "Fullstack Developer"
 *                 kind_job: "BOTH"
 *                 job_type: "FULL_TIME"
 *                 skills: [1, 2, 5, 6, 10]
 *       '500':
 *         description: Failed to get fake profiles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get fake profiles
 */
router.get('/popular_filters', PopularFiltersGet);

// =================================================================
// ============================ FILTERS ============================
// =================================================================

/**
 * @swagger
 * /api/v1/filters:
 *   post:
 *     summary: Filter profiles
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filters'
 *           example:
 *             company_id: 1
 *             location: "Madrid"
 *             job_name: "Backend"
 *             kind_job: "REMOTE"
 *             job_type: "FULL_TIME"
 *             skills: [1, 3, 4]
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               - profile_id: 17
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Backend Developer with knowledge in several technologies with 5 years of work experience
 *                 location: Madrid
 *                 job_name: Backend
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 8000
 *                 salary_max: 10000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *               - profile_id: 23
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Backend Developer with knowledge in several technologies with 5 years of work experience
 *                 location: Madrid
 *                 job_name: Backend
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 4000
 *                 salary_max: 10000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *               - profile_id: 54
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Backend Developer with knowledge in several technologies with 1 year of work experience
 *                 location: Madrid
 *                 job_name: Backend
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 2000
 *                 salary_max: 5000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *       '400':
 *         description: Some required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Some required fields are missing
 *       '404':
 *         description: Results not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Results not found
 *       '500':
 *         description: Failed to get results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get results
 */
router.post('/filters', FiltersPost);

// =================================================================
// ==================== SEARCH ENGINE (FILTER) =====================
// =================================================================

/**
 * @swagger
 * /api/v1/search_engine:
 *   post:
 *     summary: Search engine to filter
 *     tags: [Filters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filter:
 *                 type: string
 *           example:
 *             filter: "Backend"
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               - profile_id: 2
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Backend Developer with knowledge in several technologies with 5 years of work experience
 *                 location: Cali
 *                 job_name: Backend
 *                 kind_job: BOTH
 *                 job_type: FULL_TIME
 *                 salary_min: 4000
 *                 salary_max: 10000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *               - profile_id: 5
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Backend Developer with knowledge in several technologies with 1 year of work experience
 *                 location: Bogota
 *                 job_name: Backend
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 2000
 *                 salary_max: 5000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *               - profile_id: 16
 *                 is_user: true
 *                 headline: Backend developer
 *                 about_me: ""
 *                 location: Medellin
 *                 job_name: Backend
 *                 kind_job: ONSITE
 *                 job_type: PART_TIME
 *                 salary_min: 8000
 *                 salary_max: 10000
 *                 created_at: 2023-06-22T12:34:56Z
 *                 updated_at: 2023-06-22T12:34:56Z
 *       '404':
 *         description: Results not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Results not found
 *       '500':
 *         description: Failed to get results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get results
 */
router.post('/search_engine', SearchEnginePost);

export default router;
