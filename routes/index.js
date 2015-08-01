var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Bienvenido a Quiz', subTitle: 'El portal donde podra crear sus propios juegos!', errors: [] });
});

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.post('/quizes/create', quizController.create);
router.get('/quizes/new', quizController.new);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

router.get('/author', authorController.author);

module.exports = router;
