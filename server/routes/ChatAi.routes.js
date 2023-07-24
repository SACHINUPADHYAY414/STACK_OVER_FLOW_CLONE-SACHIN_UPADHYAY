import express from "express";
import { getChat, postChat } from "../controllers/ChatAi.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", auth, postChat);
router.get("/get", auth, getChat);

export default router;
