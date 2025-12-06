/**
 * DATABASE CONFIGURATION
 * ======================
 * Conexión segura a MySQL usando pool de conexiones
 * 
 * SEGURIDAD IMPLEMENTADA:
 * - Prepared statements (anti-SQLi)
 * - Pool de conexiones para mejor rendimiento
 * - Variables de entorno para credenciales
 */

const mysql = require('mysql2/promise');

// Crear pool de conexiones (más eficiente que conexiones individuales)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 3306,

    // Configuración del pool
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // Seguridad adicional
    multipleStatements: false, // Previene múltiples queries en una sola llamada (anti-SQLi)

    // Timezone
    timezone: '-03:00'
});

/**
 * Ejecuta una query con prepared statements
 * @param {string} sql - Query SQL con placeholders (?)
 * @param {Array} params - Parámetros para los placeholders
 * @returns {Promise<Array>} - Resultados de la query
 * 
 * @example
 * // CORRECTO - Usa prepared statements
 * const [users] = await query('SELECT * FROM users WHERE email = ?', [email]);
 * 
 * // INCORRECTO - NUNCA hagas esto (vulnerable a SQLi)
 * // const [users] = await query(`SELECT * FROM users WHERE email = '${email}'`);
 */
async function query(sql, params = []) {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
}

/**
 * Verifica la conexión a la base de datos
 */
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a MySQL establecida correctamente');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error.message);
        return false;
    }
}

/**
 * Cierra el pool de conexiones (para cleanup)
 */
async function closePool() {
    await pool.end();
    console.log('Pool de conexiones cerrado');
}

module.exports = {
    pool,
    query,
    testConnection,
    closePool
};
