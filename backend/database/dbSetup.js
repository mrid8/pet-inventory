const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "pets.db");
const db = new sqlite3.Database(dbPath);


function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function getAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function seedDatabase() {
  const types = ["Dog", "Cat", "Hamster", "Monkey", "Elephant"];
  const colors = ["Black", "White", "Orange", "Brown", "Purple", "Gray"];
  const pets = [
    { name: "Chloe", type: "Dog", weight: 23, is_toy: 0 },
    { name: "Linus", type: "Cat", weight: 7, is_toy: 0 },
    { name: "Jasmine", type: "Cat", weight: 8, is_toy: 0 },
    { name: "Sherlock", type: "Dog", weight: 15, is_toy: 0 },
    { name: "Peanut", type: "Monkey", weight: 1, is_toy: 1, size: "Small" },
    { name: "Dumbo", type: "Elephant", weight: 1, is_toy: 1, size: "Small" },
  ];
  const petColorMap = {
    Chloe: ["Black"],
    Linus: ["Orange", "White"],
    Jasmine: ["Black", "Brown", "White"],
    Sherlock: ["Black", "White"],
    Peanut: ["Purple"],
    Dumbo: ["Gray"],
  };

  const salesData = [
    { name: "Chloe", price: 200.0, date_sold: "2024-05-01" },
    { name: "Sherlock", price: 350.0, date_sold: "2024-05-03" },
    { name: "Peanut", price: 25.0, date_sold: "2024-05-04" },
  ];

  try {
    // Insert types
    for (const type of types) {
      await runAsync(`INSERT OR IGNORE INTO types (type_name) VALUES (?)`, [
        type,
      ]);
    }

    // Insert colors
    for (const color of colors) {
      await runAsync(`INSERT OR IGNORE INTO colors (name) VALUES (?)`, [color]);
    }

    // Insert pets
    for (const pet of pets) {
      const typeRow = await getAsync(
        `SELECT id FROM types WHERE type_name = ?`,
        [pet.type]
      );
      if (!typeRow) {
        console.error(
          `Type "${pet.type}" not found, skipping pet "${pet.name}"`
        );
        continue;
      }

      const { lastID: pet_id } = await runAsync(
        `INSERT INTO pets (name, type_id, weight, is_toy, size) VALUES (?, ?, ?, ?, ?)`,
        [pet.name, typeRow.id, pet.weight, pet.is_toy, pet.size || null]
      );

      // Insert colors for the pet
      const colorsForPet = petColorMap[pet.name] || [];
      for (const colorName of colorsForPet) {
        const colorRow = await getAsync(
          `SELECT id FROM colors WHERE name = ?`,
          [colorName]
        );
        if (colorRow) {
          await runAsync(
            `INSERT INTO pet_colors (pet_id, color_id) VALUES (?, ?)`,
            [pet_id, colorRow.id]
          );
        }
      }

      // Insert sales data if available
      const sale = salesData.find((s) => s.name === pet.name);
      if (sale) {
        const saleCountRow = await getAsync(
          `SELECT COUNT(*) as count FROM sales WHERE pet_id = ?`,
          [pet_id]
        );
        if (saleCountRow.count === 0) {
          await runAsync(
            `INSERT INTO sales (pet_id, price, date_sold) VALUES (?, ?, ?)`,
            [pet_id, sale.price, sale.date_sold]
          );
        }
      }
    }

    console.log("Database seeding complete.");
  } catch (err) {
    console.error("Error during seeding:", err);
  }
}

async function main() {
  try {
    await createTables();
    await seedDatabase();
    console.log("All done!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    db.close();
  }
}

async function createTables() {
  await runAsync(`CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT UNIQUE
  )`);

  await runAsync(`CREATE TABLE IF NOT EXISTS colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE
  )`);

  await runAsync(`CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type_id INTEGER,
    weight INTEGER,
    is_toy INTEGER,
    size TEXT,
    FOREIGN KEY (type_id) REFERENCES types(id)
  )`);

  await runAsync(`CREATE TABLE IF NOT EXISTS pet_colors (
    pet_id INTEGER,
    color_id INTEGER,
    FOREIGN KEY (pet_id) REFERENCES pets(id),
    FOREIGN KEY (color_id) REFERENCES colors(id)
  )`);

  await runAsync(`CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pet_id INTEGER,
    price REAL,
    date_sold TEXT,
    FOREIGN KEY (pet_id) REFERENCES pets(id)
  )`);
}

main();
