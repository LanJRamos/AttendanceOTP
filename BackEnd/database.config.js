import mysql from 'mysql2'

/**
 * @type {mysql.Pool}
 */
const databaseConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'attendancemgmtsys',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default databaseConn.promise()