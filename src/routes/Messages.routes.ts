import { Router } from "express";
import { MessagesGet } from "../middleWares/Messages.middleWares";

const router = Router();

router.get('/messages', MessagesGet);

export default router;