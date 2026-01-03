const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rruga për listimin e porosive (GET)
router.get('/all', orderController.getOrders);

// Rruga e re për përditësimin e transportit (PUT)
router.put('/update/:id', orderController.updateOrder);

module.exports = router;