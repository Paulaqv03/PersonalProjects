const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const testConnection = async () => {
    try{
        await connection.getConnection();
        console.log('Conexion exitosa');
    }catch(err){
        console.error('Error de conexion', err.message);
    }
}



module.exports = {connection, testConnection};