import mongoose from "mongoose";
import Post from "../models/post.js";
import User from "../models/auth.js";

export const createPost = async (req, res) => {
  try {
    const { url, description } = req.body;
    console.log(req.body);
    const userId = req.userId;
    console.log(userId, "userid");
    if ((!url, !description, !userId)) {
      res.status(502).json({
        success: false,
        message: "Something went wrong",
      });
      return;
    }

    const post = await Post.create({
      url,
      postBy: userId,
      description,
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { posts: post._id } },
      { new: true }
    );

    console.log(post, user);

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id || !userId) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
      return;
    }

    const postQuery = Post.findByIdAndUpdate(
      id,
      {
        $push: { likes: userId },
        $inc: { totalLikes: 1 },
      },
      { new: true }
    );

    const userQuery = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedPosts: id } },
      { new: true }
    );

    const [post, user] = await Promise.all([postQuery, userQuery]);

    res.status(200).json({
      success: true,
      message: "liked successfully",
      post,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.userId;

    const postQuery = Post.findByIdAndUpdate(
      id,
      {
        $pull: { likes: userId },
        $inc: { totalLikes: -1 },
      },
      { new: true }
    );

    const userQuery = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedPosts: id } },
      { new: true }
    );

    const [post, user] = await Promise.all([postQuery, userQuery]);

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      post,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!id || !userId) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
    return;
  }

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  console.log(id, userId);

  try {
    const post = await Post.findOne({ _id: id, postBy: userId });

    console.log(post);

    if (!post) {
      return res.status(404).json({
        success: false,

        message: "Post not found or you are not authorized to delete it.",
      });
    }

    await post.remove();

    res.status(202).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the post.",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("postBy", "name _id")
      .select("-__v")
      .lean();
    if (!posts) {
      res.status(404).json({
        success: false,
        message: "Posts are not found",
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get posts, try again later",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("postBy", "name _id")
      .select("-__v")
      .lean();
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post are not found",
      });
    }

    res.status(200).json({
      success: true,
      posts: [post],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get post, try again later",
    });
  }
};

export const getUserPost = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }
  try {
    const posts = await Post.find({ postBy: userId })
      .populate("postBy", "name _id")
      .select("-__v")
      .lean();
    if (!posts) {
      res.status(404).json({
        success: false,
        message: "Posts are not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
