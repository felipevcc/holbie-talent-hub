import { Router } from "express";
import { UsersGet } from "../middleWares/Users.middleWares";

const router = Router();

router.get('/', UsersGet);

export default router;
