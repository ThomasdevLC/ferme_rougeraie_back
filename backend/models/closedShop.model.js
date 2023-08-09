const mongoose = require("mongoose");

const closedShopSchema = new mongoose.Schema({
  value: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },
});

module.exports = mongoose.model("ClosedShop", closedShopSchema);
