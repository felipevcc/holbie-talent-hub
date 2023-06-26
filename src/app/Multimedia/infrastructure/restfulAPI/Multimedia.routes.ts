import { Router } from "express";
import { 
    // ProfessionalMultimedia
    ProfessionalMultimediaGet,
    ProfessionalMultimediaGetById,
    ProfessionalMultimediaPost,
    ProfessionalMultimediaPut,
    ProfessionalMultimediaDelete,
    // CompanyMultimedia
    CompanyMultimediaGet,
    CompanyMultimediaGetById,
    CompanyMultimediaPost,
    CompanyMultimediaPut,
    CompanyMediaDelete,
    // ProjectMultimedia
    ProjectMultimediaGet,
    ProjectMultimediaGetById,
    ProjectMultimediaPost,
    ProjectMultimediaPut,
    ProjectMultimediaDelete,
    // EducationMultimedia
    EducationMultimediaGet,
    EducationMultimediaGetById,
    EducationMultimediaPost,
    EducationMultimediaPut,
    EducationMultimediaDelete
} from "$Multimedia/use-cases/Multimedia.use-case";

const router = Router();

// ===============================================================
// ========================== COMPONENTS =========================
// ===============================================================

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfessionalProfileMultimedia:
 *       type: object
 *       properties:
 *         media_id:
 *           type: integer
 *         media_type:
 *           type: string
 *         file_path:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         profile_id:
 *           type: integer
 *
 *     CompanyMultimedia:
 *       type: object
 *       properties:
 *         media_id:
 *           type: integer
 *         media_type:
 *           type: string
 *         file_path:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         profile_id:
 *           type: integer
 *
 *     EducationMultimedia:
 *       type: object
 *       properties:
 *         media_id:
 *           type: integer
 *         media_type:
 *           type: string
 *         file_path:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         education_id:
 *           type: integer
 *
 *     ProjectMultimedia:
 *       type: object
 *       properties:
 *         media_id:
 *           type: integer
 *         media_type:
 *           type: string
 *         file_path:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         project_id:
 *           type: integer
 *
 *   parameters:
 *     profile_id:
 *       in: path
 *       name: profile_id
 *       description: ID of the professional profile
 *       required: true
 *       schema:
 *         type: integer
 *     media_id:
 *       in: path
 *       name: media_id
 *       description: ID of the multimedia
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
 *     project_id:
 *       in: path
 *       name: project_id
 *       description: ID of the project
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
 *   - name: Professional multimedia
 *     description: Endpoints multimedia of the professional profile
 *   - name: Company multimedia
 *     description: Endpoints multimedia of the company profile
 *   - name: Project multimedia
 *     description: Endpoints multimedia of the project
 *   - name: Education multimedia
 *     description: Endpoints multimedia of the education
 */

// ===============================================================
// ================ PROFESSIONAL_PROFILE_MULTIMEDIA ==============
// ===============================================================

/**
 * @swagger
 * /api/v1/professional_profiles/{profile_id}/multimedia:
 *   get:
 *     summary: Get multimedia for a professional profile
 *     tags: [Professional multimedia]
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
 *                 $ref: '#/components/schemas/ProfessionalProfileMultimedia'
 *             example:
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "/path/to/file.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 profile_id: 1
 *       404:
 *         description: Multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Multimedia not found
 *       500:
 *         description: Failed to get multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get multimedia
 *
 *
 *   post:
 *     summary: Add multimedia to a professional profile
 *     tags: [Professional multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media_type:
 *                 type: string
 *               file_path:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       500:
 *         description: Failed to created multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to created multimedia to professional profile
 */
router.get('/professional_profiles/:profile_id/multimedia', ProfessionalMultimediaGet);
router.post('/professional_profiles/:profile_id/multimedia', ProfessionalMultimediaPost);

/**
 * @swagger
 * /api/v1/professional_multimedia/{media_id}:
 *   get:
 *     summary: Get professional multimedia by ID
 *     tags: [Professional multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       404:
 *         description: Professional multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional multimedia not found
 *       500:
 *         description: Failed to get professional multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get professional multimedia
 *
 *   put:
 *     summary: Update professional multimedia
 *     tags: [Professional multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfessionalProfileMultimedia'
 *           example:
 *             media_type: "image/png"
 *             file_path: "/path/to/updated_file.png"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfessionalProfileMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/updated_file.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       404:
 *         description: Professional multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Professional multimedia not found
 *       500:
 *         description: Failed to update professional multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update professional multimedia
 *
 *   delete:
 *     summary: Delete professional multimedia
 *     tags: [Professional multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/ProfessionalProfileMultimedia'
 *       500:
 *         description: Failed to delete professional multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete professional multimedia
 */
router.get('/professional_multimedia/:media_id', ProfessionalMultimediaGetById);
router.put('/professional_multimedia/:media_id/', ProfessionalMultimediaPut);
router.delete('/professional_multimedia/:media_id/', ProfessionalMultimediaDelete);

// ===============================================================
// ================= COMPANY_PROFILE_MULTIMEDIA ==================
// ===============================================================

/**
 * @swagger
 * /api/v1/company_profiles/{profile_id}/multimedia:
 *   get:
 *     summary: Get multimedia for a company profile
 *     tags: [Company multimedia]
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
 *                 $ref: '#/components/schemas/CompanyMultimedia'
 *             example:
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "http://resources/image.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 profile_id: 1
 *       404:
 *         description: Media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Media not found
 *       500:
 *         description: Failed to get multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get multimedia
 *
 *   post:
 *     summary: Add multimedia to a company profile
 *     tags: [Company multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/profile_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media_type:
 *                 type: string
 *               file_path:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "http://resources/image.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       500:
 *         description: Failed to create multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create multimedia for company profile
 */
router.get('/company_profiles/:profile_id/multimedia', CompanyMultimediaGet);
router.post('/company_profiles/:profile_id/multimedia', CompanyMultimediaPost);

/**
 * @swagger
 * /api/v1/company_multimedia/{media_id}:
 *   get:
 *     summary: Get company multimedia by ID
 *     tags: [Company multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "http://resources/image.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       404:
 *         description: media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: media not found
 *       500:
 *         description: Failed to get company multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get company multimedia
 *
 *   put:
 *     summary: Update company multimedia
 *     tags: [Company multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyMultimedia'
 *           example:
 *             media_type: "image/png"
 *             file_path: "http://resources/image.jpg"
 *     responses:
 *       204:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CompanyMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "http://resources/image.jpg"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               profile_id: 1
 *       404:
 *         description: media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: media not found
 *       500:
 *         description: Failed to update company multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update company multimedia
 *
 *   delete:
 *     summary: Delete company multimedia
 *     tags: [Company multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: media not found
 *       500:
 *         description: Failed to delete company multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete company multimedia
 */
router.get('/company_multimedia/:media_id', CompanyMultimediaGetById);
router.put('/company_multimedia/:media_id', CompanyMultimediaPut);
router.delete('/company_multimedia/:media_id', CompanyMediaDelete);

// ===============================================================
// ====================== PROJECT_MULTIMEDIA =====================
// ===============================================================

/**
 * @swagger
 * /api/v1/projects/{project_id}/multimedia:
 *   post:
 *     summary: Created multimedia to a project
 *     tags: [Project multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media_type:
 *                 type: string
 *               file_path:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file1.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               project_id: 1
 *       500:
 *         description: Failed to create multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to create multimedia in the project
 *   get:
 *     summary: Get project multimedia
 *     tags: [Project multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/project_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectMultimedia'
 *             example:
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "/path/to/file1.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 project_id: 1
 *               - media_id: 2
 *                 media_type: "video/mp4"
 *                 file_path: "/path/to/file2.mp4"
 *                 created_at: "2023-06-23T12:30:00Z"
 *                 updated_at: "2023-06-23T12:30:00Z"
 *                 project_id: 1
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Project not found
 *       500:
 *         description: Failed to get project multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get project multimedia
 */
 
router.post('/projects/:project_id/multimedia', ProjectMultimediaPost);
router.get('/projects/:project_id/multimedia', ProjectMultimediaGet);
    
/**
 * @swagger
 * /api/v1/project_multimedia/{media_id}:
 *   get:
 *     summary: Get project multimedia by ID
 *     tags: [Project multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectMultimedia'
 *             example:
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "/path/to/file1.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 project_id: 1
 *               - media_id: 1
 *                 media_type: "video/mp4"
 *                 file_path: "/path/to/file2.mp4"
 *                 created_at: "2023-06-23T12:30:00Z"
 *                 updated_at: "2023-06-23T12:30:00Z"
 *                 project_id: 1
 *       404:
 *         description: Media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Media not found
 *       500:
 *         description: Failed to get project multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get project multimedia
 *   put:
 *     summary: Update project multimedia
 *     tags: [Project multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectMultimedia'
 *           example:
 *             media_type: "image/jpeg"
 *             file_path: "/path/to/file.jpg"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file1.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               project_id: 1
 *       404:
 *         description: Media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Media not found
 *       500:
 *         description: Failed to update project multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update project multimedia
 *   delete:
 *     summary: Delete project multimedia
 *     tags: [Project multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Media not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Media not found
 *       500:
 *         description: Failed to delete project multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete project multimedia
 */
router.get('/project_multimedia/:media_id', ProjectMultimediaGetById);
router.put('/project_multimedia/:media_id', ProjectMultimediaPut);
router.delete('/project_multimedia/:media_id', ProjectMultimediaDelete);

// ===============================================================
// =================== EDUCATION - MULTIMEDIA ====================
// ===============================================================

/**
 * @swagger
 * /api/v1/education/{education_id}/multimedia:
 *   post:
 *     summary: Upload multimedia for education
 *     tags: [Education multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/education_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               media_type:
 *                 type: string
 *                 description: Type of the multimedia (e.g., image/png, video/mp4)
 *             required:
 *               - file
 *               - media_type
 *           example:
 *             media_type: "image/png"
 *             file_path: "/path/to/file1.png"
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EducationMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file1.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               education_id: 1
 *       500:
 *         description: Failed to upload multimedia for education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to upload multimedia for education
 *   get:
 *     summary: Get multimedia for education
 *     tags: [Education multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/education_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EducationMultimedia'
 *             example:
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "/path/to/file1.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 education_id: 1
 *               - media_id: 1
 *                 media_type: "image/png"
 *                 file_path: "/path/to/file1.png"
 *                 created_at: "2023-06-22T10:00:00Z"
 *                 updated_at: "2023-06-22T10:00:00Z"
 *                 education_id: 1
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education not found
 *       500:
 *         description: Failed to get multimedia for education
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get multimedia for education
 */
router.post('/education/:education_id/multimedia', EducationMultimediaPost);
router.get('/education/:education_id/multimedia', EducationMultimediaGet);

/**
 * @swagger
 * /api/v1/education_multimedia/{media_id}:
 *   get:
 *     summary: Get education multimedia by ID
 *     tags: [Education multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EducationMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/png"
 *               file_path: "/path/to/file.png"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-22T10:00:00Z"
 *               education_id: 1
 *               
 *       404:
 *         description: Education multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education multimedia not found
 *       500:
 *         description: Failed to get education multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to get education multimedia
 *
 *   put:
 *     summary: Update education multimedia
 *     tags: [Education multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EducationMultimedia'
 *           example:
 *             media_type: "image/jpeg"
 *             file_path: "/path/to/file.jpg"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EducationMultimedia'
 *             example:
 *               media_id: 1
 *               media_type: "image/jpeg"
 *               file_path: "/path/to/file.jpg"
 *               created_at: "2023-06-22T10:00:00Z"
 *               updated_at: "2023-06-23T12:30:00Z"
 *               education_id: 1
 *       404:
 *         description: Education multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education multimedia not found
 *       500:
 *         description: Failed to update education multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to update education multimedia
 *
 *   delete:
 *     summary: Delete education multimedia
 *     tags: [Education multimedia]
 *     parameters:
 *       - $ref: '#/components/parameters/media_id'
 *     responses:
 *       204:
 *         description: Successful operation
 *       404:
 *         description: Education multimedia not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Education multimedia not found
 *       500:
 *         description: Failed to delete education multimedia
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               message: Failed to delete education multimedia
 */
router.get('/education_multimedia/:media_id', EducationMultimediaGetById);
router.put('/education_multimedia/:media_id', EducationMultimediaPut);
router.delete('/education_multimedia/:media_id', EducationMultimediaDelete);

export default router;
