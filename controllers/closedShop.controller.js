const ClosedShop = require("../models/closedShop.model");

module.exports.updateClosedShop = async (req, res) => {
  try {
    const { closedShop: newClosedShop } = req.body;
    console.log(req.body);
    await ClosedShop.findOneAndUpdate({}, { value: newClosedShop }, { upsert: true });

    res.json({ closedShop: newClosedShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getClosedShop = async (req, res) => {
  try {
    const closedShop = await ClosedShop.findOne();
    if (!closedShop) {
      res.json({ closedShop: false });
    } else {
      res.json({ closedShop: closedShop.value });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateClosedShopMessage = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(req.body, "body");

    await ClosedShop.findOneAndUpdate({}, { message: message }, { upsert: true });

    res.json({ message: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getClosedShopMessage = async (req, res) => {
  try {
    const closedShop = await ClosedShop.findOne();
    if (!closedShop) {
      res.status(404).json({ message: "Message not found" });
    } else {
      res.status(200).json({ message: closedShop.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
