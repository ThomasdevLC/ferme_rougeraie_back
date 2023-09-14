const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    // required: true,
  },
  isDisplayed: {
    type: Boolean,
    required: true,
  },
  limited: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
