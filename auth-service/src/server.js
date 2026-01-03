require('dotenv').config();
const app = require('./app');
const db = require('./db/index'); // Lidhja me Database

const PORT = process.env.PORT || 5000;

/**
 * Funksioni për nisjen e serverit
 * Sigurohet që lidhja me DB është aktive para se të hapet porta
 */
const startServer = async () => {
    try {
        // Testojmë nëse mund të komunikojmë me DB (opsionale por e rekomanduar)
        await db.query('SELECT 1'); 
        
        app.listen(PORT, () => {
            console.log(`=============================================`);
            console.log(`✅ AUTH-SERVICE u ndez me sukses!`);
            console.log(`🚀 Serveri: http://localhost:${PORT}`);
            console.log(`📂 Databaza: E lidhur (MySQL në Docker)`);
            console.log(`=============================================`);
        });
    } catch (err) {
        console.error(`❌ GABIM: Serveri nuk mund të nisej!`);
        console.error(`Detajet: ${err.message}`);
        process.exit(1); // Mbyll procesin nëse dështon lidhja
    }
};

startServer();