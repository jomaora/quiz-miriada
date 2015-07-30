'use strict'

var models = require('../models/models.js');

exports.question = function(req, res, err) {
    models.Quiz.findAll()
        .success(function(quizes) {
            res.render('quizes/question', {pregunta: quizes[0].pregunta});
        })
    ;
};

exports.answer = function(req, res, err) {
    models.Quiz.findAll()
        .success(function(quizes) {
            var message = (req.query.respuesta === quizes[0].respuesta) ? 'Correcto' : 'Incorrecto';
            res.render('quizes/answer', {respuesta: message});
        })
    ;
};