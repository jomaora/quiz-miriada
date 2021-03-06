'use strict'
var _ = require('lodash');
var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
    console.log('quizId to load', quizId);
    models.Quiz.find({
            where: { id: Number(quizId) },
            include: [{model: models.Comment}]
        })
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
                console.log(err);
                res.render('/quizes/new', {quiz: quiz, errors: err.errors});
            }
            else {
                quiz
                    .save({fields: ["pregunta", "respuesta", "tema"]})
                    .then(function(){
                        res.redirect('/quizes');
                    })
                ;    
            }
        })
    ;
};

exports.new = function(req, res, next) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta",
        tema: 'otro'
    });
    res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.update = function(req, res, next) {
    req.quiz = _.merge(req.quiz, _.pick(req.body.quiz, ['pregunta', 'respuesta', 'tema']));
    req.quiz.validate()
        .then(function(err) {
            if (err) {
                console.log(err);
                res.render('/quizes/new', {quiz: quiz, errors: err.errors});
            }
            else {
                req.quiz
                    .save({fields: ["pregunta", "respuesta", "tema"]})
                    .then(function(){
                        res.redirect('/quizes');
                    })
                ;    
            }
        })
    ;
};

exports.edit = function(req, res, next) {
    var quiz = req.quiz;
    res.render('quizes/edit', {quiz: quiz, errors: []});
};

exports.destroy = function(req, res, next) {
    req.quiz.destroy()
        .then(function(){
            res.redirect('/quizes');
        })
        .catch(function(err) {
            next(err);
        })
    ;
};