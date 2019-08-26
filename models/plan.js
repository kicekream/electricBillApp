const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  type: String,
  price: Number,
  duration: Number
});

//Virtual for plan url
planSchema.virtual("url").get(function() {
  //return "plan/" + this._id;
});

const Plan = mongoose.model("Plan", planSchema);
