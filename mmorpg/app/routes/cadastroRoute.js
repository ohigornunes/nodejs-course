module.exports = function (application) {
    application.get('/cadastro', function (req, res) {
        console.log('cadastroRoute /cadastro');
        application.app.controllers.cadastroController.cadastro(application, req, res)
    });
    
    application.post('/cadastrar', function (req, res) {
        console.log('cadastroRoute /cadastar');
        application.app.controllers.cadastroController.cadastrar(application, req, res)
    }); 
}