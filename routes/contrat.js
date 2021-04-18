const express = require("express");
const router = express.Router();
const isAdmin = require("../middlewares/protectAdmin");
const isConnected = require("../middlewares/protectAuth");
const Contrat = require("../models/Contrat");

/* GET contrat listing. */
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const contrats = await Contrat.find();
    res.status(200).json({ contrats });
  } catch (error) {
    next(error);
  }
});

/* GET my contrats infos. */
router.get("/:id", isConnected, async (req, res, next) => {
  try {
    const user = await (await Contrat.findById(req.session.currentUser._id)).isSelected("-users");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
});

/* POST create contrat. */
router.post("/", isAdmin, async (req, res, next) => {
  console.log(req.body);
  try {
    const contrat = await Contrat.create(req.body);
    res.status(201).json({ contrat });
  } catch (error) {
    next(error);
  }
});

/* DELETE user in contract */
router.patch("/:id", isConnected, async (req, res, next) => {
  const user =
    req.session.currentUser.type === "admin" ? req.body.user : req.session.currentUser._id;
    const today = new Date();
    const dateEnd = req.body.dateEnd || today
    if(dateEnd < today) res.status(400).json({ message: "Date >= unsuscribing date / end date :" + dateEnd });
  try {
    const contrat = await Contrat.findByIdAndUpdate(req.params.id, { $pull: { users: user }, dateEnd});
    res.status(201).json({ message: "User deleted in contrat", contrat });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
