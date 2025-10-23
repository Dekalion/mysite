// init-db.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function initializeDatabase() {
  try {
    // Путь к файлу БД (создастся автоматически)
    const dbPath = path.join(__dirname, 'database', 'vetclinic.db');
    
    // Открываем соединение с БД
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Создаём таблицу users
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ База данных успешно создана в', dbPath);
    await db.close();
  } catch (error) {
    console.error('❌ Ошибка при создании БД:', error);
  }
}

initializeDatabase();