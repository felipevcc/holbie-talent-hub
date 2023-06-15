import { Router } from "express";
import { 
  RatingGetById, 
  RatingPut, 
  UserSentRatingsGet,
  RatingPost,
  UserReceivedRatingsGet,
  ProjectRatingGetById,
  ProjectRatingPut,
  CompanySentRatingsGet,
  CompanyRatingPost,
  ProjectReceivedRatingsGet
} from "../middleWares/Ratings.middleWares";

const router = Router();

// ratings
router.get('/ratings/:rating_id', RatingGetById);
router.put('/ratings/:rating_id', RatingPut);
// users - ratings
router.get('/users/:user_id/ratings/sent', UserSentRatingsGet);
router.post('/users/:user_id/ratings/sent', RatingPost);
router.get('/users/:user_id/ratings/received', UserReceivedRatingsGet);

// projects - ratings
router.get('/project_ratings/:rating_id/', ProjectRatingGetById);
router.put('/project_ratings/:rating_id/', ProjectRatingPut);

// company (sent ratings)
router.get('/company_profiles/:profile_id/ratings', CompanySentRatingsGet);
router.post('/company_profiles/:profile_id/ratings', CompanyRatingPost);
 
// project (received ratings)
router.get('/projects/:project_id/ratings', ProjectReceivedRatingsGet);

export default router;
