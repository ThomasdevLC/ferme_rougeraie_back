const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
  }
);

productSchema.virtual("imagePath").get(function () {
  return `${process.env.SELF_URI}/images/${this.image}`;
});

module.exports = mongoose.model("product", productSchema);
