const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
