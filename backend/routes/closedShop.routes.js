const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  getClosedShop,
  updateClosedShop,
} = require("../controllers/closedShop.controller");

// POST /orders
router.patch("/", authMiddleware, updateClosedShop);
router.get("/", getClosedShop);
module.exports = router;
