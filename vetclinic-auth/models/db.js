const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

async function connect() {
  // На Render используем /tmp директорию для сохранения файлов
  const dbDir = process.env.NODE_ENV === 'production' 
    ? '/tmp' 
    : path.join(__dirname, '..', 'database');
  
  // Создаем директорию если не существует
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  const dbPath = path.join(dbDir, 'vetclinic.db');
  console.log(`Database path: ${dbPath}`);
  
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

module.exports = { connect };
