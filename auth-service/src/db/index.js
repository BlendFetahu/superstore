const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Gabim te lidhja me DB:', err.message);
    } else {
        console.log('Lidhja me MySQL ne Docker u krye me sukses!');
        connection.release();
    }
});

module.exports = pool.promise();