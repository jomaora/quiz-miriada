var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bienvenido a Quiz', subTitle: 'El portal donde podra crear sus propios juegos!' });
});

module.exports = router;
