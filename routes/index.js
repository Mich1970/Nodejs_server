var express = require('express');
var router = express.Router();

// Require controller modules.
var recipie_controller = require('../controllers/recipieController');


/// Recipie ROUTES ///
//------------------------//
// GET catalog home page.
router.get('/', recipie_controller.index);

// GET recipie create page.
router.get('/recipie/create', recipie_controller.recipie_create_get);
// GET recipie create page.
router.post('/recipie/create', recipie_controller.recipie_create_post);

// GET list recipie page.
router.get('/recipie/list', recipie_controller.recipie_list_get);
// GET one recipie, e.g. http://localhost:3000/recipie/list/5
//router.get('/recipie/list/:id', recipie_controller.recipie_detail_get);
router.get('/recipie/list/:id', recipie_controller.recipie_item_get);


/*
router.get('/', (req, res) => {
  if (req.query.id == 2)
    res.send('got it');
  else if (req.query.id == 4)
  // Return params id sent in the request if id = 4
    res.send('you sent ' + req.query.id);
});
*/


// Render a pug form
router.post('/', (req, res) => {
  res.render('form', { title: 'recipie app' });
});
// Render a pug file
router.get('/pugform', (req, res) => {
  res.render('form');
});

// Insert posted data into database
router.post('/add', (req, res) => {
  const body = req.body.Test;
  console.log(req.body.Test);
  res.send("You sent:" + req.body.Test);
//  var sql = "INSERT INTO Dishes (Dish, CreatedBy) VALUES (dish, 'Mikael Rydén')";
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log("1 external record inserted into Dishes");
//    console.log(dish);
//    res.send(dish);
//    res.json(dish);
//  });
});

// How to receive and return a json object
router.post('/json', (req, res) => {
  // Prints complete received json object
  console.log(req.body);
  // Prints only the value of Name from the received json object
  console.log(req.body.Name);
// Returns the received json object in the body of the response
res.json(req.body);
});

module.exports = router;
