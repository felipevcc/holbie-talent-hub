import { Router } from "express";
import { 
  // Users
  UsersGet,
  UserGetById,
  UserPost,
  UserPut,
  UserDelete } from "../middleWares/Users.middleWares";

const router = Router();

// Users
router.get('/users', UsersGet);
router.get('/users/:user_id', UserGetById);
router.post('/users', UserPost);
router.put('/users/:user_id', UserPut);
router.delete('/users/:user_id', UserDelete);

export default router;
