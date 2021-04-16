const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/protectAdmin");
const isConnected = require("../middlewares/protectAuth");
const User = require("../models/User");

/* GET users listing. */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

/* GET user info. */
router.get("/:id", isConnected, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

/* POST create user. */
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

/* DELETE user. */
router.post("/:id", isAdmin, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
