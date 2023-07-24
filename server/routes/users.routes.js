import express from "express";

import { login, signup } from "../controllers/auth.js";
import {
  follow,
  getAllUsers,
  sendOtp,
  unfollow,
  updateProfile,
  verifyUser,
} from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

router.get("/sendOtp", auth, sendOtp);
router.post("/verify", auth, verifyUser);

router.post("/follow", auth, follow);
router.post("/unfollow", auth, unfollow);

export default router;
