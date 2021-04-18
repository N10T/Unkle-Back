const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const optionSchema = new Schema({
  name: {type:String, required: true, unique:"true", enum:["tout risque", "vol uniquement", "incendie uniquement", "cambriolage","évènement météorologique"]},
  description: {type:String},
  //_id will be the unique id I will use
});

const Option = mongoose.model("Option", optionSchema);

module.exports = Option;
