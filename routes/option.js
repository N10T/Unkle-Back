const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/protectAdmin");
const isConnected = require("../middlewares/protectAuth");
const Option = require("../models/Option");

/* GET option listing. */
router.get("/", async (req, res, next) => {
  try {
    const options = await Option.find();
    res.status(200).json({ options });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
