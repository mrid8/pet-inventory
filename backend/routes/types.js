// routes/types.js
const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const sql = `SELECT DISTINCT type_name FROM types`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
