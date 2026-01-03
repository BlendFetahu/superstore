const db = require('../db/db');

// 1. Marrja e të gjitha porosive (me Pagination)
// order-service/src/controllers/orderController.js
exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || ''; // Marrim fjalën kyçe
        const offset = (page - 1) * limit;

        // Query që kërkon sipas ID ose Emrit të Klientit
        const [orders] = await db.execute(
            `SELECT o.order_id, o.order_date, o.ship_mode, c.customer_name 
             FROM orders o 
             JOIN customers c ON o.customer_id = c.customer_id 
             WHERE o.order_id LIKE ? OR c.customer_name LIKE ?
             LIMIT ? OFFSET ?`, 
            [`%${search}%`, `%${search}%`, String(limit), String(offset)]
        );

        const [count] = await db.execute(
            'SELECT COUNT(*) as total FROM orders o JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_id LIKE ? OR c.customer_name LIKE ?',
            [`%${search}%`, `%${search}%`]
        );
        
        res.json({
            orders,
            totalPages: Math.ceil(count[0].total / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Përditësimi i vetëm i Transportit (Ship Mode)
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params; // Marrim order_id nga URL
        const { ship_mode } = req.body; // Marrim vlerën e re nga dropdown i React

        await db.execute(
            'UPDATE orders SET ship_mode = ? WHERE order_id = ?',
            [ship_mode, id]
        );

        res.json({ message: "Transporti u përditësua me sukses në MySQL!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};