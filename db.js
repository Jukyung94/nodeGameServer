const mysql = require('mysql2');
var conn = {
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'testDB',
};

module.exports = {
  init: function () {
    return mysql.createConnection(conn);
  },
  connect: function (con) {
    con.connect(function(err) {
      if (err) console.log('sql err: ', err);
      else console.log('connect successfully');
    });
  }
};

