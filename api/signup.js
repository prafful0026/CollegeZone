const express = require("express");

const router = express.Router();
const UserModel = require("../models/UserModel.js");
const ProfileModel = require("../models/ProfileModel.js");
const FollowerModel = require("../models/FollowerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  // console.log(req.params)
  try {
    if (username.length < 1) return res.status(401).send("invalid username");
    if (!regexUserName.test(username))
      return res.status(401).send("invalid username");
    else {
      const user = await UserModel.findOne({
        username: username.toLowerCase(),
      });
      if (user) return res.status(401).send("username already taken");
      else return res.status(200).send("Available");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

router.post("/", async (req, res) => {
    console.log(req.body.profilePicUrl)
    console.log(req.body.user)
  const {
    name,
    email,
    username,
    password,
    bio,
    facebook,
    youtube,
    twitter,
    instagram,
  } = req.body.user;
  if (!isEmail(email)) return res.status(401).send("invalid email");
  if (password.length < 6)
    return res.status(401).send("password must be atleast 6 char");
  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send("email already taken");
    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileFields = {};
    profileFields.user = user._id;
    profileFields.bio = bio;
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    await new ProfileModel(profileFields).save();
    
    await new FollowerModel({user:user._id,followers:[],following:[] }).save()

    const payload={userId:user._id}
    jwt.sign(payload,process.env.jwtSecret,{expiresIn:"2d"},(err,token)=>{
        if(err) throw err
        res.status(200).json(token)
    })


  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
module.exports = router;
