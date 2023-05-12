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
    res.status(400).json({ error: "merci d'ajouter un produit" });
  }
  const product = await ProductModel.create({
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    interval: req.body.interval,
    isDisplayed: true,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit, interval, isDisplayed, image } = req.body;

    let newImage;
    if (req.file) {
      newImage = req.file.path;

      if (image && fs.existsSync(image)) {
        // Supprimer l'image précédente
        try {
          fs.unlinkSync(image);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      newImage = image;
    }

    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        unit,
        interval,
        isDisplayed,
        image: newImage,
      },
      { new: true }
    );

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ error: "ce produit n'existe pas" });
  }
  fs.unlinkSync(product.image);

  await product.deleteOne();
  res.status(200).json("produit " + req.params.id + " supprimé");
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
