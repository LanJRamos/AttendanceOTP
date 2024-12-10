import databaseConn from './database.config.js';

async function testConnection() {
    try {
        const [rows] = await databaseConn.query('SELECT 1');
        console.log('Database connection successful:', rows);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testConnection();
