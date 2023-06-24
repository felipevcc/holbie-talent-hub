import { Router } from "express";
import {
  // Skills
  SkillsGet,
  SkillGetById,
  SkillPost,
  SkillPut,
  SkillDelete,
  // ProfessionalSkills
  ProfileSkillsGet,
  ProfileSkillPost,
  // ProjectSkills
  ProjectSkillsGet,
  ProjectSkillPost
} from "../middleWares/Skills.middleWares";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         skill_id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *   parameters:
 *     skill_id:
 *       in: path
 *       name: skill_id
 *       required: true
 *       description: ID of the skill
 *       schema:
 *         type: integer
 */

// ===============================================================
// ============================= TAGS ============================
// ===============================================================

/**
 * @swagger
 * tags:
 *  name: Skills
 *  description: Skills endpoints
 */

/**
 * @swagger
 * tags:
 *  name: Professional Skills
 *  description: Professional Skills endpoints
 */

/**
 * @swagger
 * tags:
 *  name: Project Skills
 *  description: Project Skills endpoints
 */

// ===============================================================
// ============================ SKILLS ===========================
// ===============================================================

/**
 * @swagger
 * /api/v1/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *               created_at: "2023-06-21T17:40:31.218Z"
 *               updated_at: "2023-06-21T17:40:31.218Z"
 *       '500':
 *         description: Failed to get skills
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get skills
 *
 *   post:
 *     summary: Create a skill
 *     tags: [Skills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Skill created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *               created_at: "2023-06-21T17:40:31.218Z"
 *               updated_at: "2023-06-21T17:40:31.218Z"
 *       '500':
 *         description: Failed to create skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create skill
 */
router.get('/skills', SkillsGet);
router.post('/skills', SkillPost);

/**
 * @swagger
 * /api/v1/skills/{skill_id}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - $ref: '#/components/parameters/skill_id'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *               created_at: "2023-06-21T17:40:31.218Z"
 *               updated_at: "2023-06-21T17:40:31.218Z"
 *       '404':
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Skill id not found
 *       '500':
 *         description: Failed to get skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get skill
 *
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     parameters:
 *       - $ref: '#/components/parameters/skill_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Skill updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *               created_at: "2023-06-21T17:40:31.218Z"
 *               updated_at: "2023-06-21T17:40:31.218Z"
 *       '404':
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Skill not found
 *       '500':
 *         description: Failed to update skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update skill
 *
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     parameters:
 *       - $ref: '#/components/parameters/skill_id'
 *     responses:
 *       '204':
 *         description: Skill deleted successfully
 *       '404':
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Skill not found
 *       '500':
 *         description: Failed to delete skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete skill
 */
router.get('/skills/:skill_id', SkillGetById);
router.put('/skills/:skill_id', SkillPut);
router.delete('/skills/:skill_id', SkillDelete);

// ===============================================================
// ====================== PROFESSIONAL SKILLS ====================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/skills:
 *   get:
 *     summary: Get skills for a professional profile
 *     tags: [Professional Skills]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         required: true
 *         description: ID of the professional profile
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *               proficiency_level: 3
 *       '404':
 *         description: Profile id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Profile id not found
 *       '500':
 *         description: Failed to get profile's skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get profile's skill
 *
 *   post:
 *     summary: Add a skill to a professional profile
 *     tags: [Professional Skills]
 *     parameters:
 *       - in: path
 *         name: profile_id
 *         required: true
 *         description: ID of the professional profile
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               skill_id:
 *                 type: integer
 *           example:
 *             skill_id: 1
 *     responses:
 *       '201':
 *         description: Skill added successfully to the professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *             example:
 *               profile_id: 1
 *               skill_id: 1
 *               proficiency_level: 3
 *       '500':
 *         description: Failed to create profile skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create profile skill
 */
router.get('/professional_profiles/:profile_id/skills', ProfileSkillsGet);
router.post('/professional_profiles/:profile_id/skills', ProfileSkillPost);

// ===============================================================
// ========================= PROJECT SKILLS ======================
// ===============================================================

/**
 * @swagger
 * /api/v1/projects/{project_id}/skills:
 *   get:
 *     summary: Get skills for a project
 *     tags: [Project Skills]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *             example:
 *               skill_id: 1
 *               name: python
 *               description: This is a skill example
 *       '404':
 *         description: Project id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project id not found
 *       '500':
 *         description: Failed to get project's skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get project's skill
 *
 *   post:
 *     summary: Add a skill to a project
 *     tags: [Project Skills]
 *     parameters:
 *       - in: path
 *         name: project_id
 *         required: true
 *         description: ID of the project
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               skill_id:
 *                 type: integer
 *           example:
 *             skill_id: 1
 *     responses:
 *       '201':
 *         description: Skill added successfully to the project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skill'
 *             example:
 *               project_id: 1
 *               skill_id: 1
 *       '500':
 *         description: Failed to create project skill
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create project skill
 */
router.get('/projects/:project_id/skills', ProjectSkillsGet);
router.post('/projects/:project_id/skills', ProjectSkillPost);

export default router;
