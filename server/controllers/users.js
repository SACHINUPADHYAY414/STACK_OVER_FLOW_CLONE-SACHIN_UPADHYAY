import mongoose from "mongoose";
import users from "../models/auth.js";
//import { sendMails } from "../utils/sendMails.js";
import { generateOTP } from "../utils/generateOTP.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(401).send("question unavailable...");
  }
     
  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(301).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  const userId = req.userId;
  const otp = generateOTP();

  let user = await users.findById(userId).select("+otp");
  try {
    const isMailSent = await sendMails(user.name, otp, user.email);
    if (!isMailSent) {
      return res.status(503).json({
        success: false,
        message: "Something went wrong",
      });
    }

    user.otp = otp;
    await user.save();
    res.status(200).json({
      success: true,
      otp: otp,
      user: otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const verifyUser = async (req, res) => {
  const userId = req.userId;
  const { otp } = req.body;
  try {
    let user = await users.findById(userId).select("+otp");

    if (user.otp.trim() !== otp.trim()) {
      return res.status(401).json({
        success: false,
        message: "OTP mismatch",
      });
    }
    user.verified = true;
    await user.save();
    return res.status(201).json({
      success: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const follow = async (req, res) => {
  const { id } = req.body;
  const { userId } = req;
  try {
    const follower = await users.findByIdAndUpdate(
      userId,
      { $addToSet: { followers: id }, $inc: { totalFollowers: 1 } },
      { new: true }
    );
    return res.status(202).json({
      success: true,
      user: follower,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const unfollow = async (req, res) => {
  const { id } = req.body;
  const { userId } = req;
  try {
    const follower = await users.findByIdAndUpdate(
      userId,
      { $pull: { followers: id }, $inc: { totalFollowers: -1 } },
      { new: true }
    );
    return res.status(202).json({
      success: true,
      user: follower,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
