import {AuthController} from "../controller/auth-controller";
import {Router} from "express";

const router = Router();
router.post("/register",AuthController.registerController);
router.post("/login",AuthController.loginController);
export default router;