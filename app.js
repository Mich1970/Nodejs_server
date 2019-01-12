const express = require('express')
var mysql = require('mysql');
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

// Starts Nodejs_server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//Create MySQL Database named mydb
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mi19Secure!"
//  insecureAuth: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL server!");
  // Check if mydb already exists
  /*
  con.query("SHOW DATABASES", function (err, result) {
    if (err) throw err;
    console.log("Database created" + result);
  });
  */
  // Create DB named mydb if not already created
  con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
    if (err) throw err;
    console.log("mydb Database created");
  });

// Select the created database mydb
  con.query("USE mydb", function (err, result) {
    if (err) throw err;
    console.log("mydb selected (use)");
  });

  //Create Table (if not already created) with id automatically added (id INT AUTO_INCREMENT PRIMARY KEY)
  var sql = "CREATE TABLE IF NOT EXISTS Dishes (id INT AUTO_INCREMENT PRIMARY KEY, Dish VARCHAR(255), CreatedBy VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Dishes Table created");
  });

  //Insert data into the Table
  var sql = "INSERT INTO Dishes (Dish, CreatedBy) VALUES ('Pizza', 'Mikael Rydén')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Dishes");
  });

  // Get all inserted records
  if (err) throw err;
  con.query("SELECT * FROM Dishes", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });

});
