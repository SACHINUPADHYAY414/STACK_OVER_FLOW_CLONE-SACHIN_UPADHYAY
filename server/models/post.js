import mongoose from "mongoose";
const { Types } = mongoose;

const postSchema = mongoose.Schema({
  postBy: { type: Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  totalLikes: { type: Number, default: 0, required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  description: { type: String, required: true },
  postAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Post", postSchema);
