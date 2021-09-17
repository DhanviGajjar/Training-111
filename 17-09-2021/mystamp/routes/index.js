var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/stamp', function(req, res, next) {
  res.render('stamp');
});
module.exports = router;
