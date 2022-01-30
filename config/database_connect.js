const { createPool } = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
const config = require('config')

const pool = createPool({
    port: config.get('db_connection.port'),
    host: config.get('db_connection.host'),
    user: config.get('db_connection.user'),
    password: config.get('db_connection.password'),
    database: config.get('db_connection.database'),
    connectionLimit: 10,
    dateStrings: true,
    // dateStrings: 'date'   
    // (dateStrings: Force date types (TIMESTAMP, DATETIME, DATE) to be returned as strings rather then inflated into JavaScript Date objects. (Default: false))
})

module.exports = pool



