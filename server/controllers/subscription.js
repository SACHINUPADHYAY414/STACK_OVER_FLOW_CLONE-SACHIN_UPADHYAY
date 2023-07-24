import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import users from "../models/auth.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECERT_KEY,
  key_id: process.env.RAZORPAY_KEY_ID='rzp_test_BDz8Ii7OJWTgsq',
  key_secret: process.env.RAZORPAY_SECERT_KEY='GpQ1qUEAedMo7hnekrd42X7C',
});

export const order = async (req, res) => {
  let options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const verifyOrder = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body.id.response;
  const _id = req.body.id.id;
  const amount = req.body.id.amount;
  // Verify the payment signature
  try {
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECERT_KEY);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Payment successful
      if (amount === 100) {
        const user = await users.findByIdAndUpdate(_id, {
          subscription: "silver",
          subsExpire: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          result: user,
        });
      } else if (amount === 1000) {
        const user = await users.findByIdAndUpdate(_id, {
          subscription: "gold",
          subsExpire: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          success: true,
          result: user,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "subscription amount is incorrect!!!",
        });
        return;
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const checkSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findById(id);

    if (!user || !user.subscription) {
      res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    if (user.subscription === "silver" || user.subscription === "gold") {
      let currentTime = new Date().getTime();
      const diff = user.subsExpire - currentTime;
      if (diff < 0) {
        const newUser = await users.findByIdAndUpdate(id, {
          subscription: "free",
          subsExpire: 0,
        });
        res.status(200).json({ subs: "free", user: newUser });
        return;
      }
      res.status(200).json({ subs: "free", user });
      return;
    } else {
      res.status(200).json({ subs: user.subscription, user });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
