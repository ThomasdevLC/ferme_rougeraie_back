const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "voici les données" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: req.body.message });
});

router.put("/:id", (req, res) => {
  res.json({ messageId: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "post " + req.params.id + " deleted " });
});

router.patch("/like-post/:id", (req, res) => {
  res.json({ message: "post " + req.params.id + " liked " });
});

router.patch("/dislike-post/:id", (req, res) => {
  res.json({ message: "post " + req.params.id + " disliked " });
});

module.exports = router;
