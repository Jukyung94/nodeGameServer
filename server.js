const express = require('express');

const db_donfig = require(__dirname + '/db.js');
const conn = db_donfig.init();

var app = express();
app.use(express.json());

app.get('/new', (req, res) => {
  conn.query('SELECT * FROM user', function(err, result, fields) {
    if(err) console.log('err');
    console.log(result);
    res.json(result);
    res.end();
  });
});

app.listen(8080, () => {
  console.log('server start');
});