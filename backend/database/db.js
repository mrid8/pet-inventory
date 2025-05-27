const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "../database/pets.db");
const db = new sqlite3.Database(dbPath);

module.exports = db;