import express from "express";
import {
  register,
  refreshToken,
  login,
  logout,
  getUser,
  addCart,
  history
} from "../controllers/userControllers.js";

import { auth } from "../middlewares/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh_token", refreshToken);
router.get("/info", auth, getUser);
router.patch("/addcart", auth, addCart);
router.get('/history', auth, history)
export default router;
