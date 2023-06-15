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
} from "../middleWares/Multimedia.middleWares";

const router = Router();

// ProfessionalMultimedia
router.get('/professional_profiles/:profile_id/multimedia', ProfessionalMultimediaGet);
router.get('/professional_multimedia/:media_id', ProfessionalMultimediaGetById);
router.post('/professional_profiles/:profile_id/multimedia', ProfessionalMultimediaPost);
router.put('/professional_multimedia/:media_id/', ProfessionalMultimediaPut);
router.delete('/professional_multimedia/:media_id/', ProfessionalMultimediaDelete);

// CompanyMultimedia
router.get('/company/:profile_id/multimedia', CompanyMultimediaGet);
router.get('/company_multimedia/:media_id', CompanyMultimediaGetById);
router.post('/company/:profile_id/multimedia', CompanyMultimediaPost);
router.put('/company_multimedia/:media_id', CompanyMultimediaPut);
router.delete('/company_multimedia/:media_id', CompanyMediaDelete);

// ProjectMultimedia
router.get('/projects/:project_id/multimedia', ProjectMultimediaGet);
router.get('/project_multimedia/:media_id', ProjectMultimediaGetById);
router.post('/projects/:project_id/multimedia', ProjectMultimediaPost);
router.put('/project_multimedia/:media_id', ProjectMultimediaPut);
router.delete('/project_multimedia/:media_id', ProjectMultimediaDelete);

// EducationMultimedia
router.get('/education/:education_id/multimedia', EducationMultimediaGet);
router.get('/education_multimedia/:media_id', EducationMultimediaGetById);
router.post('/education/:education_id/multimedia', EducationMultimediaPost);
router.put('/education_multimedia/:media_id', EducationMultimediaPut);
router.delete('/education_multimedia/:media_id', EducationMultimediaDelete);

export default router;
