const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, enum:["user","admin"], default:"admin" },
  options: [{ type: Schema.Types.ObjectId, ref: "Option"}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
