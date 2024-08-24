const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the path to the database file in the 'data' directory inside 'src'
const dbFilePath = path.resolve(__dirname, '../data/database.db');

// Ensure the 'data' directory exists
const dir = path.dirname(dbFilePath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Create a file-based SQLite database
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create the 'posts' table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        summary TEXT NOT NULL
    )`);
});

module.exports = db;
