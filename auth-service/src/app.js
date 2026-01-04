const express = require('express');
const cors = require('cors'); // 1. Importo paketën
const routes = require('./routes'); 

const app = express();

// 2. Kjo duhet të jetë PARA app.use('/api/auth', routes)
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/auth', routes);

module.exports = app;