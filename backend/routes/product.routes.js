const express = require("express");
const multer = require("../middleware/multer-config");
const authMiddleware = require("../middleware/authMiddleware");

const {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  updateDisplay,
  updateLimited,
  updateClosedShop,
  getClosedShop,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, multer, createProduct);
router.patch("/:id", authMiddleware, multer, editProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.patch("/:id/display", authMiddleware, updateDisplay);
router.patch("/:id/limited", authMiddleware, updateLimited);
router.patch("/closedShop", authMiddleware, updateClosedShop);
router.get("/closedShop", authMiddleware, getClosedShop);
module.exports = router;
