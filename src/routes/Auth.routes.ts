import { Router } from "express";
import { Login } from "../middleWares/Auth.middleWares";

const router = Router();

// Login
router.post('/login', Login);

export default router;
