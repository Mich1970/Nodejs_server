var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

// Pug preparation
const path = require('path');

//Important! const path = require('path'); must be declared before this for the app to find the route
var routes = require('./routes/index');
var db = require('./database/DBservice');

// Create a new instance of express
var app = express();

//app.use(bodyParser.json());
app.use(bodyParser.json());
// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Pug preparation
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use('/', routes);
//app.use('/routes', routes);

module.exports = app;

const port = 3000;



// Starts Nodejs_server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//app.get('/', (req, res) => res.send('Hello World!'));


/*
app.get('/', (req, res) => {
if (req.query.id == 2)
  res.send('got it');
else if (req.query.id == 4)
// Return params id sent in the request if id = 4
  res.send('you sent ' + req.query.id);

/*
  if (err) throw err;
  con.query("SELECT * FROM Dishes WHERE id = '5'", function (err, result, fields) {
    if (err) throw err;
    console.log(result[2].Dish);
    res.send(result);
  });
*/
//});

/*
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mi19Secure!"
//  insecureAuth: true
});
*/

//Create MySQL Database named mydb
db.DB_create();
// Insert item into DB mydb
db.DB_insert();
// Get all items in database
db.DB_getall(function(list){});

db.DB_get_con();


// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
