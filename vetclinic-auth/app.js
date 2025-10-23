const express = require('express');
const cors = require('cors');
require('dotenv').config();

// const authRoutes = require('./routes/auth'); // временно закомментируйте

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Временно закомментируем роуты аутентификации
// app.use('/api/auth', authRoutes);

// Тестовый роут
app.get('/', (req, res) => {
  res.send('Сервер работает! База данных временно отключена.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
