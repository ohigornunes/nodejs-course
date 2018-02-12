var mongo = require ('mongodb');
// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

/* Wrapper */
var connMongoDB = function(params) {
    var db = new mongo.Db(
        'got',
        new mongo.Server( 
            'localhost', 
            27017, 
            {} 
        ),
        {}
    );        
    return db;
}
/* Função exportada para executar no autoload */
module.exports = function() {
    return connMongoDB;
}