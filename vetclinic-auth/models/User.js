const { connect } = require('./db');

class User {
  // Инициализация таблицы
  static async init() {
    try {
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
      console.log('Users table initialized successfully');
    } catch (error) {
      console.error('Error initializing users table:', error);
    }
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

  // Поиск пользователя по ID
  static async findById(id) {
    const db = await connect();
    return db.get('SELECT * FROM users WHERE id = ?', [id]);
  }
}

// Автоматически создаём таблицу при загрузке модели
User.init();

module.exports = User;
