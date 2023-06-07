import { Router } from "express";
import { MultimediaGet } from "../middleWares/Multimedia.middleWares";

const router = Router();

router.get('/multimedia', MultimediaGet);

export default router;
