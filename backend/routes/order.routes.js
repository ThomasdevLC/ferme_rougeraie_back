const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrders,
} = require("../controllers/order.controller");

// POST /orders
router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id", authMiddleware, updateOrderStatus);
router.delete("/", authMiddleware, deleteOrders);

module.exports = router;
