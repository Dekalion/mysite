const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./db'); // Измените эту строку
const authRoutes = require('./routes/auth');

const app = express();

// Подключение к базе данных
connectDB(); // Добавьте эту строку

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/auth', authRoutes);

// Тестовый роут
app.get('/', (req, res) => {
  res.send('Сервер работает!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
