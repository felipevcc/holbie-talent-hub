import { Router } from "express";
import { ApplicationsGet } from "../middleWares/Applications.middleWares";

const router = Router();

router.get('/applications', ApplicationsGet);

export default router;
