var path = require('path');
var Sequelize = require('sequelize');

var url = (process.env.DATABASE_URL || '').match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name     = url ? url[6] : null;
var user        = url ? url[2] : null;
var pwd         = url ? url[3] : null;
var protocol    = url ? url[1] : null;
var dialect     = url ? url[1] : 'sqlite';
var port        = url ? url[5] : null;
var host        = url ? url[4] : null;
var storage     = process.env.DATABASE_STORAGE || 'database.sqlite';

var sequelize = new Sequelize(DB_name, user, pwd,
    {
        dialect: dialect,
        protocol: protocol,
        port: port,
        host: host,
        storage: storage,
        omitNull: true
    })
;

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;
exports.sequelize = sequelize;

sequelize.sync()
.then(function() {
    Quiz.count().then(function(count) {
        if (count === 0) {
            Quiz.create({
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma',
                    tema: 'humanidades'
                })
                .then(function(quiz) {
                    console.log(quiz);
                    console.log('BD inicializada');
                    return Quiz.create({
                        pregunta: 'Capital de Francia',
                        respuesta: 'Paris',
                        tema: 'humanidades'
                    })
                })
            ;
        }
    });
});