const express = require("express");
const multer = require("../middleware/multer-config");
const {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  updateDisplay,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.post("/", multer, createProduct);
router.put("/:id", multer, editProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateDisplay);

module.exports = router;
