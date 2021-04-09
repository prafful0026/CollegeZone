const express = require("express");

const router = express.Router();
const UserModel = require("../models/UserModel.js");
const FollowerModel = require("../models/FollowerModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);
    const userFollowStats = await FollowerModel.findOne({ user: userId });

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;
  //   console.log(req.body.user);
  if (!isEmail(email)) return res.status(401).send("invalid email");
  if (password.length < 6)
    return res.status(401).send("password must be atleast 6 char");
  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) return res.status(401).send("Invalid credentials");

    const isPasssword = await bcrypt.compare(password, user.password);

    if (!isPasssword) return res.status(401).send("invalid credentials");

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
module.exports = router;
