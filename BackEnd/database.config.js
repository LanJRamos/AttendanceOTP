import mysql from 'mysql2'

/**
 * @type {mysql.Pool}
 */
const databaseConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'attendancemgmtsys',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default databaseConn.promise()