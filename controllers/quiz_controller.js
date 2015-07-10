exports.question = function(req, res, err) {
	res.render('quizes/question', {pregunta: 'Capital de Italia?'});
};

exports.answer = function(req, res, err) {
	var message = (req.query.respuesta === 'Roma') ? 'Correcto' : 'Incorrecto';
	res.render('quizes/answer', {respuesta: message});	
};