const { Pool } = require('./pool_connection');

const mysql = (function () {
  let pool = null;

  function createPool(config){
    if(pool === null){
      config.maxConnection;
      pool = Pool(config.maxConnection);
    }
    return pool;
  }
  
  return{
    createPool,
  }
})();

module.exports = mysql