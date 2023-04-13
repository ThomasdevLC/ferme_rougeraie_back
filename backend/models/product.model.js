const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isDisplayed: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
