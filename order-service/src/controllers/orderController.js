const db = require('../db/db');
const redis = require('redis');

// Krijimi dhe lidhja me klientin Redis
const redisClient = redis.createClient({
    url: 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then(() => console.log('Lidhur me Redis me sukses!'));

// 1. Marrja e të gjitha porosive (me Pagination dhe Redis Cache)
exports.getOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search || ''; 
        const offset = (page - 1) * limit;

        // Krijojmë një çelës unik për cache bazuar në kërkimin dhe faqen
        const cacheKey = `orders:search:${search}:page:${page}`;

        // Kontrollojmë nëse të dhënat janë në Redis Cache 
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('Duke shërbyer nga Redis...');
            return res.json(JSON.parse(cachedData));
        }

        console.log('Duke kërkuar në MySQL...');

        // Query për të dhënat
        const [orders] = await db.execute(
            `SELECT o.order_id, o.order_date, o.ship_mode, c.customer_name 
             FROM orders o 
             JOIN customers c ON o.customer_id = c.customer_id 
             WHERE o.order_id LIKE ? OR c.customer_name LIKE ?
             LIMIT ? OFFSET ?`, 
            [`%${search}%`, `%${search}%`, String(limit), String(offset)]
        );

        // Query për numërimin total
        const [count] = await db.execute(
            `SELECT COUNT(*) as total 
             FROM orders o 
             JOIN customers c ON o.customer_id = c.customer_id 
             WHERE o.order_id LIKE ? OR c.customer_name LIKE ?`,
            [`%${search}%`, `%${search}%`]
        );

        const responseData = {
            orders,
            totalPages: Math.ceil(count[0].total / limit),
            currentPage: page
        };

        // Ruajmë rezultatin në Redis për 1 orë (3600 sekonda) [cite: 39, 40]
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(responseData));
        
        res.json(responseData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Përditësimi i Transportit (me pastrim të Cache)
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { ship_mode } = req.body;

        await db.execute(
            'UPDATE orders SET ship_mode = ? WHERE order_id = ?',
            [ship_mode, id]
        );

        // Kur përditësojmë një të dhënë, fshijmë cache-in e vjetër për të garantuar integritetin 
        const keys = await redisClient.keys('orders:search:*');
        if (keys.length > 0) {
            await redisClient.del(keys);
        }

        res.json({ message: "Transporti u përditësua me sukses dhe cache u pastrua!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};