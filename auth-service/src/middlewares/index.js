const jwt = require('jsonwebtoken');

exports.isAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Merr tokenin pas "Bearer"

    if (!token) return res.status(401).json({ message: "Nuk ka token, autorizimi u mohua!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ message: "Qasja e mohuar! Duhet të jesh Admin." });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token i pavlefshëm" });
    }
};