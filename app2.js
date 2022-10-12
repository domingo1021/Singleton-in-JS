// For CJS, require pool connection at first.
const { Pool } = require('./pool_connection');

console.log('---active singleton----')
const config = { maxConnection: 5 };
console.time();
const activeMysql = require('./active_mysql')(config);
console.timeEnd();

console.log('---active singleton create pool----')
console.time()
const pool = activeMysql.createPool();
console.timeEnd()