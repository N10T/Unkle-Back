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

/* PATCH option id user of subscriber. */
router.put("/:id", isConnected, async (req, res, next) => {
    const optionId = req.params.id
    const userId = req.session.currentUser._id
    try {
        let options = await Option.find({_id:optionId, 'users': { $in: [req.session.currentUser._id]}});
        if(options.length === 0){
            options = await Option.findByIdAndUpdate(optionId,{ $push: { users: userId } }, {new:true})
            res.status(200).json({ options });
        } else {
            res.status(400).json({ message : "User have already subscribe this contrat" });
        }

    } catch (error) {
      next(error);
    }
  });

  module.exports = router;