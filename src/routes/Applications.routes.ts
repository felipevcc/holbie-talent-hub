import { Router } from "express";
import {
  // Application
  ApplicationGetById,
  ApplicationPost,
  ApplicationPut,
  ApplicationDelete
} from "../middleWares/Applications.middleWares";

const router = Router();

// Application
router.get('/applications/:application_id', ApplicationGetById);
router.post('/applications', ApplicationPost);
router.put('/applications/:application_id', ApplicationPut);
router.delete('/applications/:application_id', ApplicationDelete);

export default router;
