import mongoose from "mongoose";
const { Types } = mongoose;

const chatSchema = mongoose.Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  chat: [
    {
      content: { type: String, required: "Message is required" },
      role: { type: String },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);
