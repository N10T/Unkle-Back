const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/protectAdmin");
const isConnected = require("../middlewares/protectAuth");
const Contract = require("../models/Contract");

/* GET contract listing. */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json({ contracts });
  } catch (error) {
    next(error);
  }
});

/* GET my contracts infos. */
router.get("/my-contract", isConnected, async (req, res, next) => {
  try {
    const contracts = await Contract.find({ users: { $in: [req.session.currentUser._id] } }).select(
      "-users"
    );
    res.status(200).json({ contracts });
  } catch (error) {
    next(error);
  }
});

/* POST create contract. */
router.post("/", isAdmin, async (req, res, next) => {
  console.log(req.body);
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json({ contract });
  } catch (error) {
    next(error);
  }
});

/* Add user in contract */
router.patch("/:id/subscribe", isConnected, async (req, res, next) => {
  const user =
    req.session.currentUser.type === "admin" ? req.body.user : req.session.currentUser._id;

  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        $push: { users: user },
      },
      { new: true }
    );
    res.status(201).json({ message: "User add in contract", contract });
  } catch (error) {
    next(error);
  }
});

/* DELETE user in contract */
router.patch("/:id/unsubscribe", isConnected, async (req, res, next) => {
  const user =
    req.session.currentUser.type === "admin" ? req.body.user : req.session.currentUser._id;
  const today = new Date();
  const dateQuit = req.body.dateQuit || today;
  if (dateQuit < today) {
    return res.status(400).json({ message: "Date >= unsubscribing date / quit date :" + dateQuit });
  }
  try {
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { users: user },
        dateQuit,
      },
      { new: true }
    );
    res.status(201).json({ message: "User deleted in contract", contract });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
