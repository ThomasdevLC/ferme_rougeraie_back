const express = require("express");
const multer = require("../middleware/multer-config");
const authMiddleware = require("../middleware/auth");

const {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  updateDisplay,
  updateLimited,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, multer, createProduct);
router.patch("/:id", multer, editProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/display", updateDisplay);
router.patch("/:id/limited", updateLimited);

module.exports = router;
