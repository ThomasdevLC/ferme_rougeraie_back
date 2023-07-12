const ProductModel = require("../models/product.model");
const fs = require("fs");
const multer = require("../middleware/multer-config");
const path = require("path");

module.exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
};

module.exports.createProduct = async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "no product added" });
  }
  const product = await ProductModel.create({
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    interval: req.body.interval,
    isDisplayed: true,
    limited: false,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit, interval, isDisplayed } = req.body;

    let updateData = {
      name,
      price,
      unit,
      interval,
      isDisplayed,
    };

    // Check if an image file was uploaded
    if (req.file) {
      updateData.image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }

    const product = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ error: "Product not found" });
  }
  // fs.unlinkSync(product.image);
  await product.deleteOne();
  res.status(200).json("product " + req.params.id + " deleted");
};

module.exports.updateDisplay = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isDisplayed = !product.isDisplayed;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateLimited = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.limited = !product.limited;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

let closedShop = false; // Variable pour stocker la valeur de closedShop

module.exports.updateClosedShop = async (req, res) => {
  try {
    const { closedShop: newClosedShop } = req.body;
    closedShop = newClosedShop; // Mettez à jour la valeur de closedShop avec la nouvelle valeur fournie dans le corps de la requête
    console.log(closedShop);
    res.json({ closedShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getClosedShop = async (req, res) => {
  try {
    res.json({ closedShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
