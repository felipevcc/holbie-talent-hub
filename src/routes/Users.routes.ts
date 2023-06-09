import { Router } from "express";
import { UsersGet, UserGet } from "../middleWares/Users.middleWares";

const router = Router();

router.get('/users', UsersGet);
router.get('/users/:user_id', UserGet);

export default router;
