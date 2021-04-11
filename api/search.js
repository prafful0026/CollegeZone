const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/:searchText", authMiddleware, async (req, res) => {
  const { searchText } = req.params;
  if (searchText.length === 0) return;
  try {
    // let userPattern = new RegExp(`^${searchText}`);
    const results = await UserModel.find({
      name: { $regex: searchText, $options: "i" },
    });
    res.json(results)
} catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

module.exports = router;
