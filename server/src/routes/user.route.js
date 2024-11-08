import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";


const router=express.Router()

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser);

export default router;