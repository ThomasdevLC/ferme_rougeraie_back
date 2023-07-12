const mongoose = require("mongoose");

const closedShopSchema = new mongoose.Schema({
  value: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ClosedShop", closedShopSchema);
