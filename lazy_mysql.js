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

const Pool = function(maxConnection){
  let pool = [];
  let maxLimit = maxConnection;

  function checkLimit(){
    if(pool.length >= maxLimit){
      throw new Error(`Max amount ${maxLimit} exceed`)
    }
  }

  function query(sql, arr) {
    checkLimit();
    const newConnection = Connection(pool).createConnection();
    pool.push(newConnection);
    const result = newConnection.query(sql, arr);
    newConnection.release();
    return result; 
  }

  function getConnection(){
    checkLimit();
    const newConnection = Connection(pool).createConnection()
    pool.push(newConnection);
    return newConnection;
  }

  return {
    getConnection,
    query
  }
};

const Connection = function(pool){
  let connection;

  function createConnection(){
    id = pool.length;
    connection = {id, query, release};
    return connection;
  }

  function query(sql, arr){
    let splits = sql.split('?');
    const query = splits.reduce((prev, curr, index) => {
      if(index !== splits.length){
        return prev + `${arr[index - 1]}` + curr
      }
      return prev + curr
    });
    return query
  }

  function release(){
    for(let i = 0; i < pool.length; i++){
      if(pool[i].id === id){
        pool.splice(i, 1);
      }
    }
    delete connection.id;
    delete connection.query;
    delete connection.release;
  }

  return {
    createConnection,
  }
}

module.exports = mysql