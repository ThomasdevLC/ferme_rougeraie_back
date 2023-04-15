const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const app = express();

// DB connection
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", require("./routes/product.routes"));

// Start server
app.listen(port), () => console.log("serveur démarré port : " + port);
