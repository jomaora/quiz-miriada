'use strict'

var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
    models.Quiz.find(quizId)
        .then(function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            }
            else {
                next(new Error('No existe quizId '+ quizId));
            }
        })
        .catch(function(error) {
            next(error);
        })
    ;
};

exports.index = function(req, res, next) {
    var search = (req.query.search) ? '%' + (req.query.search).replace(' ', '%') + '%' : '%';
    var query = {where: ["pregunta like ?", search], order: 'pregunta ASC'};
    models.Quiz.findAll(query)
        .then(function(quizes) {
            res.render('quizes/index', {quizes: quizes, errors: []});
        })
    ;
};

exports.show = function(req, res, next) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
};

exports.answer = function(req, res, next) {
    var message = (req.query.respuesta === req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {respuesta: message, quiz: req.quiz, errors: []});
};

exports.create = function(req, res, next) {
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.validate()
        .then(function(err) {
            if (err) {
                res.render('/quizes/new', {quiz: quiz, errors: err.errors});
            }
            quiz.save({fields: ["pregunta", "respuesta"]})
                .then(function(){
                    res.redirect('/quizes');
                })
            ;
        })
    ;
};

exports.new = function(req, res, next) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta"
    });
    res.render('quizes/new', {quiz: quiz, errors: []});
};