import express from "express";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router
  .route("/category")
  .get(getCategories)
  .post(auth, adminAuth, createCategory);

router
  .route("/category/:id")
  .delete(auth, adminAuth, deleteCategory)
  .put(auth, adminAuth, updateCategory);

export default router;
