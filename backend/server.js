const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const app = express();
app.use(cors());

// DB connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/product", require("./routes/product.routes"));
app.use("/order", require("./routes/order.routes"));

// Start server
app.listen(port), () => console.log("serveur démarré port : " + port);
