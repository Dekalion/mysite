const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

async function connect() {
  return open({
    filename: path.join(__dirname, 'database', 'vetclinic.db'),
    driver: sqlite3.Database
  });
}

module.exports = { connect };