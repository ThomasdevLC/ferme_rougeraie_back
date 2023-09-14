const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const port = 5000;
const app = express();
const path = require("path");
app.use(cors());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// DB connection
connectDB();

// Middleware
app.use(express.json({ limit: "50mb" })), app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/product", require("./routes/product.routes"));
app.use("/order", require("./routes/order.routes"));
app.use("/closedShop", require("./routes/closedShop.routes"));
app.use("/images", express.static(path.join(__dirname, "images")));

// Hash the password
const saltRounds = 10;
const userPassword = process.env.ADMIN_PASSWORD;

bcrypt.hash(userPassword, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  process.env.ADMIN_PASSWORD = hash;
  console.log("Hashed password:", hash);

  // connection
  app.post("/auth/login", async (req, res) => {
    const { password } = req.body;

    console.log("ADMIN_PASSWORD:", process.env.ADMIN_PASSWORD);
    console.log("Password provided:", password);

    try {
      // check password
      const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }

      // create token JWT
      const token = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur du serveur" });
    }
  });

  // Start server
  app.listen(port, () => console.log("Serveur démarré sur le port : " + port));
});
