import express from "express";
import { signUpController,handelAlreadyUsername,loginController,deleteUser,signupSocialAuth } from "../controller/UserController.js";

const router = express.Router();
router.get("/signup/:user_name", handelAlreadyUsername);

router.post("/signup", signUpController);
router.post("/signup/socalauth", signupSocialAuth);

router.post("/login", loginController);
router.delete("/delete", deleteUser);


 
export default router;
