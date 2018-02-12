module.exports.jogo = function(application, req, res) {
    console.log('jogoController .jogo')
    
    if(req.session.autorizado != true){
        res.send('É necessário fazer login')
        return
    }
    
    var comando_invalido = 'N';
    if(req.query.comando_invalido == 'S'){
        comando_invalido = 'S';
    }
    console.log(comando_invalido);

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    
    JogoDAO.iniciarJogo(res, usuario, casa, comando_invalido);
    // res.render('jogoView', { img_casa: casa });    
}

module.exports.sair = function (application, req, res) {
    console.log('jogoController.sair')
    // res.send('sair');
    req.session.destroy(function(err) {
        res.render('indexView', {validacao: {}})
    });
}

module.exports.suditos = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.send('É necessário fazer login')
        return
    }

    console.log('jogoController .suditos')
    res.render('aldeoesView', {validacao: {}})
} 

module.exports.pergaminhos = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.send('É necessário fazer login')
        return
    }
    
    console.log('jogoController .pergaminhos')
    res.render('pergaminhosView', {validacao: {}})
} 

module.exports.ordenar_acao_sudito = function (application, req, res) {
    if (req.session.autorizado != true) {
        res.send('É necessário fazer login')
        return
    }

    console.log('jogoController.ordenar_acao_sudito')
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();


    var erros = req.validationErrors()

    console.log(erros);

    if(erros){
        res.redirect('jogo?comando_invalido=S');
        return;
    }


    // req.asyncValidationErrors().catch(function (erros) {
    //     if (erros) {
    //         res.redirect('jogo?comando_invalido=S');
    //         if (req.query.comando_invalido == 'S') {
    //             comando_invalido = 'S';
    //             console.log('comando_invalido = S')
    //         }
    //         return;
    //     };
    // });
    console.log(dadosForm)
    res.send('Show');

} 