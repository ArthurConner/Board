var express = require('express');
var router = express.Router();


var data = require("../model/people.json")
console.log("we have data",data)
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.json(data)
});



router.post('/', function(req, res) { });
router.get('/:id', function(req, res) { 
  res.json(data[req.params.id]);
});

router.patch('/:id', function(req, res) { });
router.delete('/:id', function(req, res) { });

module.exports = router;
