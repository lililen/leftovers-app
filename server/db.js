import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'leftovers',
  waitForConnections: true,
  dateStrings: true,
});

export default pool;
