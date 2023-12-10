import mysql2 from 'mysql2/promise';

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.USER_NAME,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306"),
    multipleStatements: true,
    waitForConnections: true,
    idleTimeout: 10000,
    connectionLimit: 50
});

export default pool;