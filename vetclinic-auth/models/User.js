const { connect } = require('./db');

class User {
  // Инициализация таблицы
  static async init() {
    const db = await connect();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT,
        password TEXT NOT NULL
      )
    `);
  }

  // Регистрация пользователя
  static async create({ name, email, phone, password }) {
    const db = await connect();
    const { lastID } = await db.run(
      'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
      [name, email, phone, password]
    );
    return lastID;
  }

  // Поиск пользователя по email
  static async findByEmail(email) {
    const db = await connect();
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
  }
}

// Автоматически создаём таблицу при загрузке модели
User.init();

module.exports = User;const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);