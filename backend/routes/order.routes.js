const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrders,
} = require("../controllers/order.controller");

// POST /orders
router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id", updateOrderStatus);
router.delete("/", deleteOrders);

module.exports = router;
