const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Подключение к базе данных
require('./db');

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Раздача статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Роуты API
app.use('/api/auth', authRoutes);

// Роут для главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Роуты для других HTML страниц
app.get('/contacts', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

app.get('/doctors', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'doctors.html'));
});

app.get('/prices', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'prices.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
