const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const PostModel = require("../models/PostModel.js");
const uuid= require("uuid").v4 
//create a post
router.post("/", authMiddleware, async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length < 1) return res.status(401).send("text must be atleast ");
  try {
    const newPost = {
      user: req.userId,
      text,
    };
    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;
    const post = await PostModel(newPost).save();
    const postCreated = await PostModel.findById(post._id).populate("user");

    return res.json(postCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
//get all posts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
//get a post by Id
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate("user")
      .populate("comments.user");
    if (!post) return res.status(404).send("post not found");
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//delete a post by id
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("post not found");

    const user = await UserModel.findById(userId);
    if (post.user.toString() != userId) {
      if (user.role === "root") {
        await post.remove();
        return res.status(200).send("post deleted successfully");
      } else {
        return res.status(401).send("unauthorized user");
      }
    } else {
      await post.remove();
      return res.status(200).send("post deleted successfully");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// Like a post

router.post("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("post not found");
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length > 0;
    if (isLiked) return res.status(401).send("Post already liked");
    await post.likes.unshift({ user: userId });
    await post.save();
    return res.status(200).send("post liked");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//unlike a post

router.put("/unlike/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("post not found");
    const isLiked =
      post.likes.filter((like) => like.user.toString() === userId).length === 0;
    if (isLiked) return res.status(401).send("Post not liked before");
    const index = post.likes
      .map((like) => like.user.toString())
      .indexOf(userId);

    await post.likes.splice(index, 1);
    await post.save();
    return res.status(200).send("post unliked");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//Get all likes
router.get("/like/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId).populate("likes.user");
    if (!post) return res.status(404).send("post not found");
    
    return res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});


// Create a comment

router.post("/comment/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req;
    const {text}=req.body
    if(text.length<1) return res.status(401).send("comment should be atleast 1 character")
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("post not found");
    const newComment={
      _id:uuid(),
      text,
      user:userId,
      date:Date.now()
    }
    await post.comments.unshift(newComment)
    await post.save()
    return res.status(200).send(newComment._id);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

//Delete a comment
router.delete("/comment/:postId/:commentId", authMiddleware, async (req, res) => {
  try {
    const { postId,commentId } = req.params;
    const { userId } = req;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).send("post not found");
    const comment=post.comments.find(comment=>comment._id===commentId)
    if(!comment) return res.status(404).send("comment not found");
    const user=await UserModel.findById(userId)
    if(comment.user.toString()!==userId)
    {
      if(user.role==="root")
      {
        const indexOf=post.comments.map(comment=>comment._id).indexOf(commentId)
        await post.comments.splice(indexOf,1)
        await post.save()
        return res.status(200).send("comment deleted successfully")
      }
      else
      {
        return res.status(401).send("unauthorized user")
      }
    }
    else
    {
      const indexOf=post.comments.map(comment=>comment._id).indexOf(commentId)
      await post.comments.splice(indexOf,1)
      await post.save()
      return res.status(200).send("comment deleted successfully")
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
module.exports = router;
