// order-service/src/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Konfigurimi i plotë i CORS
app.use(cors({
    origin: 'http://localhost:5173', // Adresa e Frontend-it tënd (Vite)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Order-Service po punon në portën ${PORT}`);
});