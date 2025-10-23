const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Маршруты для HTML страниц
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// API маршрут для проверки работы сервера
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Сервер работает! Статические файлы обслуживаются.',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
