const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/protectAdmin");
const isConnected = require("../middlewares/protectAuth");
const User = require("../models/User");

/* GET users listing. */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

/* GET user info. */
router.get("/my-profile", isConnected, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.currentUser._id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

/* POST create user. */
router.post("/", isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body).select("-password");
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

/* Add unique options in user */
router.patch("/option", isConnected, async (req, res, next) => {
  const selectedOptions = req.body.options;
  console.log("selectedOptions :", selectedOptions);
  const userId = req.session.currentUser._id;

  try {
    const user = await User.findById(req.session.currentUser._id).select("-password");
    console.log("user:", user);

    const subscribedOptions = user.options.reduce((acc, option) => {
      selectedOptions.forEach((selectedOption) => {
        console.log(option, selectedOption);
        if (option == selectedOption) acc = [...acc, option];
      });
      return acc;
    }, []);
    console.log("subscribedOptions", subscribedOptions);
    if (subscribedOptions.length === 0) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { options: { $each: selectedOptions } } },
        { new: true }
      ).select("-password");
      res.status(200).json({ user: updatedUser });
    } else {
      res.status(400).json({ subscribedOptions, message: "Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
});

/* Add contract in user */
router.patch("/contract", isConnected, async (req, res, next) => {
  const contractId = req.body.contract;
  const userId = req.session.currentUser._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { contracts: contractId } },
      { new: true }
    ).select("-password");
    res.status(200).json({ user: updatedUser });

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
