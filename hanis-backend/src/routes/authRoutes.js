import express from "express";
import { loginAdmin, signupAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);

export default router;
