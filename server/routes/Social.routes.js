import express from "express";
import auth from "../middleware/auth.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getUserPost,
  likePost,
  unlikePost,
} from "../controllers/Social.js";

const router = express.Router();

router.post("/create", auth, createPost);

router.patch("/like/:id", auth, likePost);
router.patch("/unlike/:id", auth, unlikePost);

router.get("/all", getAllPosts);
router.get("/userPosts/:id", getUserPost);
router.get("/:id", getPostById);

router.delete("/:id", auth, deletePost);

export default router;
