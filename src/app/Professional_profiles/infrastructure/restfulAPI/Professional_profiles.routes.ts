import { Router } from "express";
import {
  // ProfessionalProfiles
  ProfilesGet,
  ProfileGetById,
  ProfilePost,
  ProfilePut,
  ProfileDelete,
  // ProfileEducation
  ProfileEducationGet,
  EducationGetById,
  EducationPost,
  EducationPut,
  EducationDelete,
  // ProfileExperience
  ProfileExperienceGet,
  ExperienceGetById,
  ExperiencePost,
  ExperiencePut,
  ExperienceDelete,
  // Jobs
  JobGet,
  // User
  ProfileUserGet
} from "../../use-cases/Professional_profiles.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
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
 *         profile:
 *           type: string
 *         readme:
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
 *
 *     Education:
 *       type: object
 *       properties:
 *         education_id:
 *           type: integer
 *         institution:
 *           type: string
 *         degree:
 *           type: string
 *         field_of_study:
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
 *         profile_id:
 *           type: integer
 *
 *     Experience:
 *       type: object
 *       properties:
 *         experience_id:
 *           type: integer
 *         company_name:
 *           type: string
 *         position:
 *           type: string
 *         description:
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
 *         profile_id:
 *           type: integer
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
 *         role: "ACADEMY-STUDENTS"
 *         created_at: "2021-01-01T00:00:00.000Z"
 *         updated_at: "2021-01-01T00:00:00.000Z"
 *         company_id: null
 *         professional_id: 2
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *   parameters:
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID of the professional profile
 *       required: true
 *       schema:
 *         type: integer
 *     education_id:
 *       in: path
 *       name: education_id
 *       description: ID of the education
 *       required: true
 *       schema:
 *         type: integer
 *     experience_id:
 *       in: path
 *       name: experience_id
 *       description: ID of the experience
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
 *   - name: Professional profiles
 *     description: Endpoints to manage professional profiles
 *   - name: Experience
 *     description: Endpoints to manage experience of a professional profile
 *   - name: Jobs
 *     description: Endpoints to manage jobs
 *   - name: Education
 *     description: Endpoints to profile education
 */

// ===============================================================
// ================== PROFESSIONAL PROFILE =======================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles:
 *   post:
 *     summary: Create a new professional profile
 *     tags: [Professional profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfile'
 *           example:
 *             is_user: true
 *             headline: Web Developer
 *             about_me: Experienced web developer with a passion for front-end development.
 *             profile: https://www.example.com/profile.png
 *             readme: Experienced web developer with a passion for front-end development.
 *             location: San Francisco, CA
 *             job_name: Full Stack Developer
 *             kind_job: REMOTE
 *             job_type: FULL_TIME
 *             salary_min: 80000
 *             salary_max: 100000
 *     responses:
 *       201:
 *         description: susccessful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               profile_id: 1
 *               is_user: true
 *               headline: Web Developer
 *               about_me: Experienced web developer with a passion for front-end development.
 *               profile: https://www.example.com/profile.png
 *               readme: Experienced web developer with a passion for front-end development.
 *               location: San Francisco, CA
 *               job_name: Full Stack Developer
 *               kind_job: REMOTE
 *               job_type: FULL_TIME
 *               salary_min: 80000
 *               salary_max: 100000
 *               created_at: 2023-06-22T12:34:56Z
 *               updated_at: 2023-06-22T12:34:56Z
 *       500:
 *         description: Failed to create professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create professional profile
 *   get:
 *     summary: Get all professional profiles
 *     tags: [Professional profiles]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               - profile_id: 1
 *                 is_user: true
 *                 headline: Web Developer
 *                 about_me: Experienced web developer with a passion for front-end development.
 *                 profile: https://www.example.com/profile.png
 *                 readme: Experienced web developer with a passion for front-end development.
 *                 location: San Francisco, CA
 *                 job_name: Full Stack Developer
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 8000
 *                 salary_max: 10000
 *                 created_at: 2023-06-22T12:34:56.000Z
 *                 updated_at: 2023-06-22T12:34:56.000Z
 *               - profile_id: 2
 *                 is_user: true
 *                 headline: Backend Developer
 *                 about_me: Passionate about programming and web development.
 *                 profile: https://www.example.com/profile.jpg
 *                 readme: Passionate about programming and web development.
 *                 location: Cali, Colombia
 *                 job_name: Backend Developer
 *                 kind_job: REMOTE
 *                 job_type: FULL_TIME
 *                 salary_min: 6000
 *                 salary_max: 8000
 *                 created_at: 2023-07-03T22:08:11.000Z
 *                 updated_at: 2023-07-03T22:08:11.000Z
 *       500:
 *         description: Failed to get professional profiles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get professional profiles
 */
router.post('/professional_profiles', ProfilePost);
router.get('/professional_profiles', ProfilesGet);

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}:
 *   get:
 *     summary: Get a professional profile by ID
 *     tags: [Professional profiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               profile_id: 1
 *               is_user: true
 *               headline: "Software Engineer"
 *               about_me: "Experienced software engineer with a passion for creating innovative solutions."
 *               profile: https://www.example.com/profile.png
 *               readme: Experienced software engineer with a passion for creating innovative solutions.
 *               location: "New York, USA"
 *               job_name: "Software Developer"
 *               kind_job: "REMOTE"
 *               job_type: "FULL_TIME"
 *               salary_min: 50000
 *               salary_max: 80000
 *               created_at: "2022-05-15T10:30:00Z"
 *               updated_at: "2022-06-20T15:45:00Z"
 *       404:
 *         description: Professional profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional profile not found
 *       500:
 *         description: Failed to get professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get professional profile
 *   put:
 *     summary: Update a professional profile by ID
 *     tags: [Professional profiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfile'
 *           example:
 *             headline: Web Developer
 *             about_me: Experienced web developer with a passion for front-end development.
 *             profile: https://www.example.com/profile.png
 *             readme: Experienced web developer with a passion for front-end development.
 *             location: San Francisco, CA
 *             job_name: Full Stack Developer
 *             kind_job: REMOTE
 *             job_type: FULL_TIME
 *             salary_min: 60000
 *             salary_max: 100000
 *     responses:
 *       200:
 *         description: Professional profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               profile_id: 1
 *               is_user: true
 *               headline: Web Developer
 *               about_me: Experienced web developer with a passion for front-end development.
 *               profile: https://www.example.com/profile.png
 *               readme: Experienced web developer with a passion for front-end development.
 *               location: San Francisco, CA
 *               job_name: Full Stack Developer
 *               kind_job: REMOTE
 *               job_type: FULL_TIME
 *               salary_min: 60000
 *               salary_max: 100000
 *               created_at: 2022-05-15T10:30:000Z
 *               updated_at: 2022-06-20T15:45:000Z
 *       404:
 *         description: profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: profile not found
 *       500:
 *         description: Failed to update professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update professional profile
*
*   delete:
*     summary: Delete a professional profile by ID
*     tags: [Professional profiles]
*     parameters:
*       - $ref: '#/components/parameters/profile_id'
*     responses:
*       204:
*         description: Professional profile deleted successfully
*       404:
*         description: Professional profile not found
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*             example:
*               message: Professional profile not found
*       500:
*         description: Failed to delete professional profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*             example:
*               message: Failed to delete professional profile
*/
router.get('/professional_profiles/:profile_id', ProfileGetById);
router.put('/professional_profiles/:profile_id', ProfilePut);
router.delete('/professional_profiles/:profile_id', ProfileDelete);

// ===============================================================
// ================== PROFESSIONAL EDUCATION =====================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/education:
 *   post:
 *     summary: Add education to a professional profile
 *     tags: [Education]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *           examples:
 *             example1:
 *               value:
 *                 institution: "University of Example"
 *                 degree: "Bachelor of Science"
 *                 field_of_study: "Computer Science"
 *                 start_date: "2015-09-01"
 *                 end_date: "2019-06-30"
 *     responses:
 *       201:
 *         description: Education added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *             examples:
 *               example1:
 *                 value:
 *                   education_id: 1
 *                   institution: "University of Example"
 *                   degree: "Bachelor of Science"
 *                   field_of_study: "Computer Science"
 *                   start_date: "2015-09-01"
 *                   end_date: "2019-06-30"
 *                   created_at: "2021-12-15T10:30:00Z"
 *                   updated_at: "2021-12-15T10:30:00Z"
 *                   profile_id: 1
 *       500:
 *         description: Failed to create education for professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               example1:
 *                 value:
 *                   message: Failed to create education for professional profile
 *
 *   get:
 *     summary: Get education of a professional profile
 *     tags: [Education]
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
 *                 $ref: '#/components/schemas/Education'
 *             example:
 *               - education_id: 1
 *                 institution: "University of Example"
 *                 degree: "Bachelor of Science"
 *                 field_of_study: "Computer Science"
 *                 start_date: "2015-09-01"
 *                 end_date: "2019-06-30"
 *                 created_at: "2021-12-15T10:30:00Z"
 *                 updated_at: "2021-12-15T10:30:00Z"
 *                 profile_id: 1
 *               - education_id: 2
 *                 institution: "Another University"
 *                 degree: "Master of Business Administration"
 *                 field_of_study: "Business Management"
 *                 start_date: "2020-01-01"
 *                 end_date: "2022-12-31"
 *                 created_at: "2021-12-15T11:45:00Z"
 *                 updated_at: "2021-12-15T11:45:00Z"
 *                 profile_id: 1
 *       404:
 *         description: Professional profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional profile not found
 *       500:
 *         description: Failed to get education of professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get education of professional profile
 */
router.post('/professional_profiles/:profile_id/education', EducationPost);
router.get('/professional_profiles/:profile_id/education', ProfileEducationGet);

/**
 * @swagger
 * /api/v1/education/{education_id}:
 *   get:
 *     summary: Get education by ID
 *     tags: [Education]
 *     parameters:
 *       - $ref: '#/components/parameters/education_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *             example:
 *               education_id: 1
 *               institution: "University of Example"
 *               degree: "Bachelor of Science"
 *               field_of_study: "Computer Science"
 *               start_date: "2015-09-01"
 *               end_date: "2019-06-30"
 *               created_at: "2021-12-15T10:30:00Z"
 *               updated_at: "2021-12-15T10:30:00Z"
 *               profile_id: 1
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education not found
 *       500:
 *         description: Failed to get education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get education
 *   put:
 *     summary: Update education by ID
 *     tags: [Education]
 *     parameters:
 *       - $ref: '#/components/parameters/education_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *           example:
 *             institution: "Updated University"
 *             degree: "Master of Science"
 *             field_of_study: "Data Science"
 *             start_date: "2016-09-01"
 *             end_date: "2020-06-30"
 *     responses:
 *       200:
 *         description: Education updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Education'
 *             example:
 *               education_id: 1
 *               institution: "Updated University"
 *               degree: "Master of Science"
 *               field_of_study: "Data Science"
 *               start_date: "2016-09-01"
 *               end_date: "2020-06-30"
 *               created_at: "2021-12-15T10:30:00Z"
 *               updated_at: "2023-06-23T10:30:00Z"
 *               profile_id: 1
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education not found
 *       500:
 *         description: Failed to update education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update education
 *   delete:
 *     summary: Delete education by ID
 *     tags: [Education]
 *     parameters:
 *       - $ref: '#/components/parameters/education_id'
 *     responses:
 *       200:
 *         description: Education deleted successfully
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education not found
 *       500:
 *         description: Failed to delete education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete education
 */
router.get('/education/:education_id', EducationGetById);
router.put('/education/:education_id', EducationPut);
router.delete('/education/:education_id', EducationDelete);

// ===============================================================
// ========================== EXPERIENCE =========================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/experience:
 *   post:
 *     summary: Add experience to a professional profile
 *     tags: [Experience]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *           example:
 *             company_name: "Example Company"
 *             position: "Software Engineer"
 *             description: "Worked on developing web applications"
 *             start_date: "2019-01-01"
 *             end_date: "2022-12-31"
 *     responses:
 *       201:
 *         description: Experience added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *             example:
 *               experience_id: 1
 *               company_name: "Example Company"
 *               position: "Software Engineer"
 *               description: "Worked on developing web applications"
 *               start_date: "2019-01-01"
 *               end_date: "2022-12-31"
 *               created_at: "2021-12-15T10:30:00Z"
 *               updated_at: "2021-12-15T10:30:00Z"
 *               profile_id: 1   
 *       500:
 *         description: Failed to add experience to professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to add experience to professional profile
 *   get:
 *     summary: Get experience of a professional profile
 *     tags: [Experience]
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
 *                 $ref: '#/components/schemas/Experience'
 *             example:
 *               - experience_id: 1
 *                 company_name: "Example Company"
 *                 position: "Software Engineer"
 *                 description: "Worked on developing web applications"
 *                 start_date: "2019-01-01"
 *                 end_date: "2022-12-31"
 *                 created_at: "2021-12-15T10:30:00Z"
 *                 updated_at: "2023-06-23T10:30:00Z"
 *                 profile_id: 1
 *               - experience_id: 2
 *                 company: "Another Company"
 *                 position: "Senior Developer"
 *                 description: "Led a team in building a mobile app"
 *                 start_date: "2023-01-01"
 *                 end_date: "2023-06-30"
 *                 created_at: "2021-12-15T10:30:00Z"
 *                 updated_at: "2023-06-23T10:30:00Z"
 *                 profile_id: 1
 *       404:
 *         description: Professional profile not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional profile not found
 *       500:
 *         description: Failed to get experience of professional profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get experience of professional profile
 */
router.post('/professional_profiles/:profile_id/experience', ExperiencePost);
router.get('/professional_profiles/:profile_id/experience', ProfileExperienceGet);

/**
 * @swagger
 * /api/v1/experience/{experience_id}:
 *   get:
 *     summary: Get experience by ID
 *     tags: [Experience]
 *     parameters:
 *       - $ref: '#/components/parameters/experience_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *             example:
 *               experience_id: 1
 *               company_name: "Example Company"
 *               position: "Software Engineer"
 *               description: "Worked on developing web applications"
 *               start_date: "2018-01-01"
 *               end_date: "2022-12-31"
 *               created_at: "2021-12-15T10:30:00Z"
 *               updated_at: "2023-06-23T10:30:00Z"
 *               profile_id: 1
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Experience not found
 *       500:
 *         description: Failed to get experience
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get experience
 *   put:
 *     summary: Update experience by ID
 *     tags: [Experience]
 *     parameters:
 *       - $ref: '#/components/parameters/experience_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *           example:
 *             company_name: "Updated Company"
 *             position: "Senior Software Engineer"
 *             description: "Led a team in developing web applications"
 *             start_date: "2019-01-01"
 *             end_date: "2023-12-31"
 *     responses:
 *       200:
 *         description: Experience updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experience'
 *             example:
 *               experience_id: 1
 *               company_name: "Example Company"
 *               position: "Software Engineer"
 *               description: "Led a team in developing web applications"
 *               start_date: "2018-01-01"
 *               end_date: "2022-12-31"
 *               created_at: "2021-12-15T10:30:00Z"
 *               updated_at: "2023-06-23T10:30:00Z"
 *               profile_id: 1
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Experience not found
 *       500:
 *         description: Failed to update experience
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update experience
 *   delete:
 *     summary: Delete experience by ID
 *     tags: [Experience]
 *     parameters:
 *       - $ref: '#/components/parameters/experience_id'
 *     responses:
 *       204:
 *         description: Experience deleted successfully
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Experience not found
 *       500:
 *         description: Failed to delete experience
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete experience
 */
router.get('/experience/:experience_id', ExperienceGetById);
router.put('/experience/:experience_id', ExperiencePut);
router.delete('/experience/:experience_id', ExperienceDelete);

// ===============================================================
// ============= COMPANY_PROFESSIONAL_PROFILES (jobs) ============
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/jobs:
 *   get:
 *     summary: Get jobs for a professional profile
 *     tags: [Jobs]
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
 *                 $ref: '#/components/schemas/ProfessionalProfile'
 *             example:
 *               - company_id: 1
 *                 company_name: "Google"
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Experience not found
 *       500:
 *         description: Failed to get jobs
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get jobs for professional profile
 */
router.get('/professional_profiles/:profile_id/jobs', JobGet);

// ===============================================================
// ====================== PROFILE USER (user) ====================
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/user:
 *   get:
 *     summary: Get professional profile user
 *     tags: [Professional profiles]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Profile id not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Profile id not found
 *       500:
 *         description: Failed to get user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get user
 */
router.get('/professional_profiles/:profile_id/user', ProfileUserGet);

export default router;
