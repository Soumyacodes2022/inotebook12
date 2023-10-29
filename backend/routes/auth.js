const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ a: "hello", b: 19 });
});

module.exports = router;
