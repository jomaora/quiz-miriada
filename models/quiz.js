'use strict'

// definition du Schema comme sur mongoose

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta: DataTypes.STRING,
        respuesta: DataTypes.STRING
    });
};