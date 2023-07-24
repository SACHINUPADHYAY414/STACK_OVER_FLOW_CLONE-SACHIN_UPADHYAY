import mongoose from "mongoose";
const { Types } = mongoose;
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: true },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  otp: { type: String, select: false },
  posts: [{ type: Types.ObjectId, ref: "Post", required: true }],
  totalFollowers: { type: Number, default: 0, required: true },
  followers: [{ type: Types.ObjectId, ref: "User" }],
  likedPosts: [{ type: Types.ObjectId, ref: "Post" }],
  subscription: { type: String, default: "free" },
  subsExpire: { type: Number, default: 0 },
  lastQuestionDate: { type: Number },
  todayQuestionCount: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);
