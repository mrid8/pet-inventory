const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const sql = `
    SELECT pets.name, types.type_name, pets.size, pets.is_toy, pets.weight,
           sales.price, sales.date_sold
    FROM sales
    JOIN pets ON pets.id = sales.pet_id
    JOIN types ON pets.type_id = types.id
    ORDER BY sales.date_sold DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
