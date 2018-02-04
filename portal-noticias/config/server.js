var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
// var validator = require('validator');//em teste

var app = express();

/** Configurando o express configurar o ejs como engine */
app.set('view engine', 'ejs');

/** Configurando o express para enxegar as views */
app.set('views', './app/views');

//Middleware
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;