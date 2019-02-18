const express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mi19Secure!"
//  insecureAuth: true
});

//Get MySQL Database (mydb) connection object
//----------------------------------------
module.exports.DB_get_con = function() {
  console.log("Fetched db connection" + con);
  return con;
};

//Get Dish for requested id from database (mydb) connection object
//----------------------------------------
module.exports.DB_get_item = function(id, callback) {
//  var ID = id;

  // Select the created database mydb
  con.query("USE mydb", function (err, result) {
    if (err) throw err;
    console.log("mydb selected (use)");
  });

  con.query(`SELECT * FROM Dishes WHERE id=${id}`, function (err, result, fields) {
    if (err) throw err;
      console.log('Fetched Dish '+ result.Dish +' from id: ' + id);
      callback(result);
  });
};

//Create MySQL Database named mydb
//----------------------------------------
module.exports.DB_create = function() {

  // Connect to MySQL server
  con.connect(function(err) {

    if (err) throw err;
    console.log("Connected to MySQL server!");

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
  });
};

//Insert data into the Table
//----------------------------------------
module.exports.DB_insert = function() {

  // Select the created database mydb
  con.query("USE mydb", function (err, result) {
    if (err) throw err;
    console.log("mydb selected (use)");
  });

  var sql = "INSERT INTO Dishes (Dish, CreatedBy) VALUES ('Pasta', 'Mikael Rydén')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted into Dishes");
  });
};

// Get all inserted records
//----------------------------------------
module.exports.DB_getall = function(callback) {

  // Select the created database mydb
  con.query("USE mydb", function (err, result) {
    if (err) throw err;
    console.log("mydb selected (use)");
  });
//  result='not set';
  //if (err) throw err;
  con.query("SELECT * FROM Dishes", function (err, result, fields) {
    if (err) throw err;
//    console.log(result[23]);
    callback(result);

  });

};
