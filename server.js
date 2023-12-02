const express = require('express');
const bodyParser = require('body-parser');

const db_donfig = require(__dirname + '/db.js');
const conn = db_donfig.init();

var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  console.log('hello world');
  res.send('<h1>hello world</h1>');
}) 

app.get('/new', (req, res) => {
  conn.query('SELECT * FROM user', function(err, result, fields) {
    if(err) console.log('err');
    console.log(result);
    res.json(result);
    res.end();
  });
});

app.post('/login', (req, res) => {
  const email = req.body.userId;
  const queryString = `SELECT * FROM user WHERE email=?`;
  conn.query(queryString, email, function(err, result) {
    if(!result.length) {
      console.log("empty", typeof result.length);
      res.json("user not found");
    } else
      console.log("=============================", result);
      res.json(result)
  })
})

app.post('/add', (req, res) => {
  console.log('11111111111111111111111111111111');
  console.log(req.body);
  const name = req.body.userName;
  const email = req.body.userId;

  const queryString = `INSERT INTO user (userName, email, password) VALUES ('${name}', '${email}', '"1234"')`;
  conn.query(queryString, function(err, result) {
    if(err) {
      console.log(err);
    } else {
      console.log('user Info insert successfully');
      res.json("user added");
    }
  })
})

app.listen(8080, () => {
  console.log('server start');
});