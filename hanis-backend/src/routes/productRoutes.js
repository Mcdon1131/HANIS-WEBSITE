import express from "express";

import {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(authMiddleware, upload.single("image"), addProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(authMiddleware, upload.single("image"), updateProduct)
  .delete(authMiddleware, deleteProduct);

export default router;