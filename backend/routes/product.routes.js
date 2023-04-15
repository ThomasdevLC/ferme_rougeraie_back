const express = require("express");
const {
  setProducts,
  getProducts,
  editProduct,
  deleteProduct,
  updateDisplay,
} = require("../controllers/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.post("/", setProducts);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateDisplay);

module.exports = router;
