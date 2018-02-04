/** Importação do módulo do framework Express */
var express = require('express')

/** Importação do módulo do Consign */
var consign = require('consign')

/** Importação do módulo do Body-Parser */
var bodyParser = require('body-parser')

/** Importação do módulo do Express-Validator */
var expressValidator = require('express-validator')

/** Instância o objeto Express */
var app = express()

/** Setar as varáveis 'view engine' e 'viwes' do Express */
/** Engine usada para processamento */
app.set('view engine', 'ejs') 
/** Onde a view podem ser encontradas */
app.set('views', './app/views')

/** COnfigurar o middleware express.static */
app.use(express.static('./app/public'))

/** Configurar o middleware body-parser  */
app.use(bodyParser.urlencoded({extended: true}))

/** COnfirguar o middleware Express-Validator */
app.use(expressValidator())

/** Configurar o autoload Consign para Rotas Controllers Models para o objeto app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)


/** Exportar o objeto app */
module.exports = app