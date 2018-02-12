module.exports = function(application){
	application.get('/', function(req, res){
		console.log('indexRoute /');
		application.app.controllers.indexController.index(application, req, res)
	});
	application.post('/autenticar', function (req, res) {
		console.log('indexRoute /autenticar  ');
		application.app.controllers.indexController.autenticar(application, req, res)
	});
}