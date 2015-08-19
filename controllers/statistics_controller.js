'use strict'
var _ = require('lodash');
var Promise = require('bluebird');
var models = require('../models/models.js');

exports.show = function(req, res, next) {
	Promise.join(models.Quiz.count(), models.Comment.count(), models.Comment.aggregate('QuizId', 'count', {'distinct': true, 'where': {'publicado':true}}), 
		function(totalQuizes, totalComments, totalQuizesWithComments) {
			var commentsPerQuestion = totalComments / totalQuizes;
			res.render('quizes/statistics', {
				totalQuizes: totalQuizes, 
				totalComments: totalComments, 
				commentsPerQuestion: commentsPerQuestion,
				totalQuizesWithComments: totalQuizesWithComments,
				totalQuizesWithoutComments: totalQuizes - totalQuizesWithComments,
				errors: []
			});
		}
	)
	.catch(function(err) {
		next(err);
	})
};