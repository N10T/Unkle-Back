const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contratSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User", required: true, unique:true }],
  number: { type: Number },
  status: { type: String , enum:["pending", "active", "finished"], default:"pending"},
  dateStart: { type: Date, required: true, default: Date.now },
  dateEnd: { type: Date },
  dateQuit: { type: Date },
  options: [{ type: Schema.Types.ObjectId, ref: "Option", required: true }],
});

const Contrat = mongoose.model("Contrat", contratSchema);

module.exports = Contrat;
