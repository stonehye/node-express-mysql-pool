'user strict';

var mysql = require('mysql');

//mysql db connection config
var db_config = {
  host: '',
  port: '',
  database: '',
  user: '',
  password: ''
};

var pool = mysql.createPool(db_config);

var getConnection = function(callback) {
  pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
};

module.exports = getConnection;
