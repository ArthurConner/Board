var express = require('express');
var router = express.Router();

var localface = require('localface');
var womenCount = localface.count['f'];

var file = localface.get('f',0);
console.log("this should be a file",file);		// "/home/fritz/Dev/npm/localface/portraits/women/59.jpg" 
//fs.existsSync(file);		// true 
var bar = localface.get('m');

console.log("this should be a file",bar);

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

router.get('/:id/image', function(req, res) { 
  const foo = data[req.params.id]
  var file = localface.get(foo.gender.toLowerCase(),foo.imageID);
  res.sendFile(file)
});

router.patch('/:id', function(req, res) { });
router.delete('/:id', function(req, res) { });

module.exports = router;
