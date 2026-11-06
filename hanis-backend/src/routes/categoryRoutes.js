import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getCategories).post(authMiddleware, addCategory);

router.route("/:id").delete(authMiddleware, deleteCategory);

export default router;
