const mongoose = require("mongoose");

const patriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true },
  image: { type: String, required: true },
  order: { type: Number, required: true },
});
const Patries = mongoose.model("Patries", patriesSchema);
module.exports = Patries;
