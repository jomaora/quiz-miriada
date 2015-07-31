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
    models.Quiz.findAll()
        .success(function(quizes) {
            res.render('quizes/index', {quizes: quizes});
        })
    ;
};

exports.show = function(req, res, next) {
    res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res, next) {
    var message = (req.query.respuesta === req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {respuesta: message, quiz: req.quiz});
};