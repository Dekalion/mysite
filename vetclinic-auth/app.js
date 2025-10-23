const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Инициализация базы данных при запуске
require('./models/User'); // Это вызовет User.init()

// Роуты
app.use('/api/auth', authRoutes);

// Тестовый роут
app.get('/', (req, res) => {
  res.send('Сервер работает с SQLite!');
});

// Health check для Render
app.get('/health', (req, res) => {
  res.json({ status: 'OK', database: 'SQLite' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
