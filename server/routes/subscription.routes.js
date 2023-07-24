import express from "express";
import {
  checkSubscription,
  order,
  verifyOrder,
} from "../controllers/subscription.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/order", auth, order);
router.post("/is-order-complete", auth, verifyOrder);
router.get("/check-subscription/:id", auth, checkSubscription);

export default router;
