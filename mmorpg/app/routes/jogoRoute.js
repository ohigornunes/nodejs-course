module.exports = function (application) {
    application.get('/jogo', function (req, res) {
        console.log('jogoRoute /jogo')
        application.app.controllers.jogoController.jogo(application, req, res)
    });
    
    application.get('/sair', function (req, res) {
        console.log('jogoRoute /sair')
        application.app.controllers.jogoController.sair(application, req, res)
    });
    
    application.get('/suditos', function (req, res) {
        console.log('jogoRoute /suditos')
        application.app.controllers.jogoController.suditos(application, req, res)
    });
    
    application.get('/pergaminhos', function (req, res) {
        console.log('jogoRoute /pergaminhos')
        application.app.controllers.jogoController.pergaminhos(application, req, res)
    });
    
    application.post('/ordenar_acao_sudito', function (req, res) {
        console.log('jogoRoute /ordenar_acao_sudito')
        application.app.controllers.jogoController.ordenar_acao_sudito(application, req, res)
    });
}