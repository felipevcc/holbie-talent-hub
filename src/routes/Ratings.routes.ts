import { Router } from "express";
import { RatingsGet } from "../middleWares/Ratings.middleWares";

const router = Router();

router.get('/ratings', RatingsGet);

export default router;
