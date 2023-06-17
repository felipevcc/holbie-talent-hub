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

// Ratings
router.get('/ratings/:rating_id', RatingGetById);
router.put('/ratings/:rating_id', RatingPut);

// Users - Ratings
router.get('/users/:user_id/ratings/sent', UserSentRatingsGet);
router.post('/users/:user_id/ratings/sent', RatingPost);
router.get('/users/:user_id/ratings/received', UserReceivedRatingsGet);

// Projects - Ratings
router.get('/project_ratings/:rating_id/', ProjectRatingGetById);
router.put('/project_ratings/:rating_id/', ProjectRatingPut);

// Company (sent ratings)
router.get('/company_profiles/:profile_id/ratings', CompanySentRatingsGet);
router.post('/company_profiles/:profile_id/ratings', CompanyRatingPost);
 
// Project (received ratings)
router.get('/projects/:project_id/ratings', ProjectReceivedRatingsGet);

export default router;
