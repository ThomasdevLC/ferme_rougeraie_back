const ClosedShop = require("../models/closedShop.model");

module.exports.updateClosedShop = async (req, res) => {
  try {
    const { closedShop: newClosedShop } = req.body;
    console.log(req.body);
    // Mettez à jour la valeur de closedShop dans la base de données
    await ClosedShop.findOneAndUpdate(
      {},
      { value: newClosedShop },
      { upsert: true }
    );

    res.json({ closedShop: newClosedShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getClosedShop = async (req, res) => {
  try {
    // Récupérez la valeur de closedShop depuis la base de données
    const closedShop = await ClosedShop.findOne();

    if (!closedShop) {
      // Si aucun closedShop n'est trouvé, utilisez une valeur par défaut
      res.json({ closedShop: false });
    } else {
      res.json({ closedShop: closedShop.value });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
