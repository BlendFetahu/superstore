const express = require('express');
const router = express.Router();
const authController = require('../controllers');
const { isAdmin } = require('../middlewares');

// Login është publik
router.post('/login', authController.login);

// Register-staff kërkon që personi të jetë ADMIN dhe i kyçur (isAdmin)
router.post('/register-staff', isAdmin, authController.register);

// Kjo rrugë na duhet vetëm një herë për të krijuar Adminin e parë (mund ta fshish më vonë)
router.post('/setup-admin', authController.register);

//GET ALL STAFF
router.get('/users', isAdmin, authController.getAllStaff);

// UPDATE STAFF
router.put('/users/:id', isAdmin, authController.updateStaff);

// DELETE STAFF
router.delete('/users/:id', isAdmin, authController.deleteStaff);

module.exports = router;