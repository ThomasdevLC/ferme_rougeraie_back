const ProductModel = require("../models/product.model");

module.exports.getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json(products);
};

module.exports.setProducts = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({ error: "merci d'ajouter un produit" });
  }
  const product = await ProductModel.create({
    title: req.body.title,
    isDisplayed: true,
  });

  res.status(200).json(product);
};

module.exports.editProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ error: "ce produit n'existe pas" });
  }
  const updateProduct = await ProductModel.findByIdAndUpdate(
    product,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateProduct);
};

module.exports.deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(400).json({ error: "ce produit n'existe pas" });
  }
  await product.deleteOne();
  res.status(200).json("produit " + req.params.id + " supprimé");
};

module.exports.updateDisplay = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isDisplayed = !product.isDisplayed; // toggle isDisplayed property

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
