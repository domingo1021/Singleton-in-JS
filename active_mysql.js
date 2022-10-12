const { Pool } = require('./pool_connection');

const mysql = function (config) {
  // Create pool at once.
  let pool = Pool(config.maxConnection);

  function createPool(){
    return pool;
  }
  
  return{
    createPool,
  }
};

module.exports = (config) => {
  const obj = mysql(config);

  return obj
}