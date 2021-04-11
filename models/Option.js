const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type:String, required: true, unique:"true", enum:["tout risque", "vol uniquement", "incendie uniquement", "cambriolage","évènement météorologique"]},
  description: {type:String},
  users:[{ type: Schema.Types.ObjectId, ref: "User" }]
  //_id will be the unique id I will use
});

const User = mongoose.model("Contrat", userSchema);

module.exports = User;
