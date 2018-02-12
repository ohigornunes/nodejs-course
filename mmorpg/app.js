/* importar as configurações do servidor */
var app = require('./config/server');
var porta = 8080;

/* parametrizar a porta de escuta */
app.listen(porta, function(){
	console.log('');
	console.log('=====================================');
	console.log('.:::SERVIDOR ONLINE NA PORTA ' + porta + ':::.');
	console.log('=====================================');
}) 