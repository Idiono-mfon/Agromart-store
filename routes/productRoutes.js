import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

router.route("/products").get(getProducts).post(auth, adminAuth, createProduct);

router
  .route("/products/:id")
  .delete(auth, adminAuth, deleteProduct)
  .put(auth, adminAuth, updateProduct);

export default router;
