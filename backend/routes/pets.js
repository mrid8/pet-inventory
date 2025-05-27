const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const {
    search,
    type,
    is_toy,
    size,
    min_weight,
    max_weight,
    min_price,
    max_price,
    date_sold_start,
    date_sold_end,
    color,
  } = req.query;

  let sql = `
    SELECT 
      pets.id, pets.name, pets.weight, pets.is_toy, pets.size, 
      types.type_name,
      sales.price, sales.date_sold,
      GROUP_CONCAT(DISTINCT colors.name) AS color_names
    FROM pets
    JOIN types ON pets.type_id = types.id
    LEFT JOIN sales ON pets.id = sales.pet_id
    LEFT JOIN pet_colors ON pets.id = pet_colors.pet_id
    LEFT JOIN colors ON pet_colors.color_id = colors.id
    WHERE 1=1
  `;
  const params = [];

  if (type) {
    sql += " AND types.type_name = ?";
    params.push(type);
  }

  if (is_toy !== undefined) {
    sql += " AND pets.is_toy = ?";
    params.push(is_toy === "true" ? 1 : 0);
  }

  if (size) {
    sql += " AND pets.is_toy = 1 AND pets.size = ?";
    params.push(size);
  }

  if (min_weight) {
    sql += " AND pets.weight >= ?";
    params.push(Number(min_weight));
  }

  if (max_weight) {
    sql += " AND pets.weight <= ?";
    params.push(Number(max_weight));
  }

  if (min_price) {
    sql += " AND (sales.price IS NOT NULL AND sales.price >= ?)";
    params.push(Number(min_price));
  }

  if (max_price) {
    sql += " AND (sales.price IS NOT NULL AND sales.price <= ?)";
    params.push(Number(max_price));
  }

  if (date_sold_start) {
    sql += " AND (sales.date_sold IS NOT NULL AND sales.date_sold >= ?)";
    params.push(date_sold_start);
  }

  if (date_sold_end) {
    sql += " AND (sales.date_sold IS NOT NULL AND sales.date_sold <= ?)";
    params.push(date_sold_end);
  }

  if (search) {
    const term = `%${search.toLowerCase()}%`;
    sql += `
    AND (
      LOWER(pets.name) LIKE ? OR
      LOWER(types.type_name) LIKE ? OR
      LOWER(colors.name) LIKE ?
    )
  `;
    params.push(term, term, term);
  }

  if (color) {
    const colorList = Array.isArray(color)
      ? color
      : color.split(",").map((c) => c.trim());

    const placeholders = colorList.map(() => "?").join(", ");

    sql += `
    AND pets.id IN (
      SELECT pet_colors.pet_id
      FROM pet_colors
      JOIN colors ON pet_colors.color_id = colors.id
      WHERE colors.name IN (${placeholders})
      GROUP BY pet_colors.pet_id
      HAVING COUNT(DISTINCT colors.name) = ?
    )
  `;
    params.push(...colorList, colorList.length);
  }

  sql += `
    GROUP BY pets.id
  `;

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
