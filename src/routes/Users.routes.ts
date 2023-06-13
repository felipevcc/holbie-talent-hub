import { Router } from "express";
import { UsersGet, UserGetById, UserPost, UserPut, UserDelete } from "../middleWares/Users.middleWares";

const router = Router();

router.get('/users', UsersGet);
router.get('/users/:user_id', UserGetById);
router.post('/users', UserPost);
router.put('/users/:user_id', UserPut);
router.delete('/users/:user_id', UserDelete);

export default router;
