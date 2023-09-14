const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getClosedShop,
  updateClosedShop,
  updateClosedShopMessage,
  getClosedShopMessage,
} = require("../controllers/closedShop.controller");

// POST /orders
router.patch("/", authMiddleware, updateClosedShop);
router.get("/", getClosedShop);
router.post("/", authMiddleware, updateClosedShopMessage);
router.get("/message", getClosedShopMessage);
module.exports = router;
