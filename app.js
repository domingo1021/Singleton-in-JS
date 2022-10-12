const mysql = require('./lazy_mysql');
// const mysql = require('./active_mysql');

const config = { maxConnection: 5 };

const pool = mysql.createPool(config);
console.log("Pool query: ",pool.query('SELECT * FROM user WHERE user_id = ? AND email = ?;', [1, "domingo@gamil.com"]))

// get first connection, and release.
const connection = pool.getConnection();
console.log('First connection: ', connection)
console.log(connection.query('SELECT * FROM user WHERE user_id = ? AND email = ?;', [1, "domingo@gamil.com"]))
connection.release();

// get a connection.
const conn2 = pool.getConnection();
console.log('Second connection: ', conn2);

// get too much connection.
console.log(pool.getConnection());
console.log(pool.getConnection());
console.log(pool.getConnection());
console.log(pool.getConnection());

// check if mysql createPool is Singleton.
const pool2 = mysql.createPool(config);
console.log(`Check if pool is Singleton: ${pool === pool2}`);

// Exception when connection exceed max num.
console.log(pool.getConnection());
