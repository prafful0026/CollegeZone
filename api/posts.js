const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const PostModel = require("../models/PostModel.js");

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
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

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

router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate("user")
    .populate("comments.user");
    if(!post) return res.status(404).send("post not found")
    return res.json(post)
      

  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});


router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const {userId}=req
    const {postId}=req.params

    const post = await PostModel.findById(postId)
    if(!post) return res.status(404).send("post not found")
    
    const user= await UserModel.findById(userId)
    if(post.user.toString()!=userId){
      if(user.role==="root")
     { await post.remove()
      return res.status(200).send("post deleted successfully")
     }
     else{
      return res.status(401).send("unauthorized user")
    
    }
    }
    else{
      await post.remove()
      return res.status(200).send("post deleted successfully")
    }
      
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
module.exports = router;
