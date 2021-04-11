const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contratSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  number: { type: Number },
  status: { type: String , enum:["pending", "active", "finished"]},
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date },
  options: [{ type: Schema.Types.ObjectId, ref: "Option", required: true }],
});

const Contrat = mongoose.model("Contrat", contratSchema);

module.exports = Contrat;
