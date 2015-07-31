'use strict'

var models = require('../models/models.js');

exports.index = function(req, res, err) {
    models.Quiz.findAll()
        .success(function(quizes) {
            res.render('quizes/index', {quizes: quizes});
        })
    ;
};

exports.show = function(req, res, err) {
    models.Quiz.find(req.params.quizId)
        .success(function(quiz) {
            res.render('quizes/show', {quiz: quiz});
        })
    ;
};

exports.answer = function(req, res, err) {
    models.Quiz.find(req.params.quizId)
        .success(function(quiz) {
            var message = (req.query.respuesta === quiz.respuesta) ? 'Correcto' : 'Incorrecto';
            res.render('quizes/answer', {respuesta: message, quiz: quiz});
        })
    ;
};