const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Kontrollojmë nëse vijnë të dhënat
        if (!email || !password) {
            return res.status(400).json({ message: "Ju lutem plotësoni të gjitha fushat!" });
        }

        // 2. Kërkojmë përdoruesin në DB
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: "Email ose fjalëkalim i gabuar!" });
        }

        // 3. Verifikojmë fjalëkalimin
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ose fjalëkalim i gabuar!" });
        }

        // 4. Gjenerojmë Token-in (Shtojmë një string rezervë nëse .env dështon)
        const secret = process.env.JWT_SECRET || 'super_sekreti_rezerva_123';
        
        const token = jwt.sign(
            { id: user.id, role: user.role },
            secret,
            { expiresIn: '1d' }
        );

        // 5. Kthejmë përgjigjen
        console.log(`✅ Login i suksesshëm: ${user.email} (${user.role})`);
        return res.json({ 
            message: "Login me sukses", 
            token, 
            role: user.role 
        });

    } catch (err) {
        console.error("❌ Gabim në Login:", err.message);
        return res.status(500).json({ error: "Gabim i brendshëm i serverit!" });
    }
};

// Logjika e Register (E paprekur)
exports.register = async (req, res) => {
    try {
        const { email, password, role, first_name, last_name, birthdate } = req.body;

        // Kontrollojmë nëse emaili ekziston
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ message: "Email ekziston!" });

        // Enkriptojmë fjalëkalimin
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ruajmë përdoruesin me fushat e reja
        await db.query(
            'INSERT INTO users (email, password, role, first_name, last_name, birthdate) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, role || 'STAFF', first_name, last_name, birthdate]
        );

        res.status(201).json({ message: `Përdoruesi ${first_name} ${last_name} u regjistrua me sukses!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Gabim gjatë regjistrimit në server" });
    }
};