module.exports.jogo = function(application, req, res) {
    console.log('jogoController .jogo')
    
    if(req.session.autorizado != true){
        res.send('É necessário fazer login')
        return
    }
    
    var msg = '';
    if(req.query.msg != ''){
        msg = req.query.msg;
    }
    console.log(msg);

    var usuario = req.session.usuario;
    var casa = req.session.casa;
    var connection = application.config.dbConnection;
    var JogoModel = new application.app.models.JogoModel(connection);
    
    JogoModel.iniciarJogo(res, usuario, casa, msg);
    // JogoModel = new application.iniciarJogo(res, usuario, casa, msg);
    // res.render('jogoView', { img_casa: casa }); 
    
    // var UsuariosModel = new application.app.models.UsuariosModel(connection);

    // UsuariosModel.autenticar(dadosForm, req, res);
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
    console.log('jogoController .pergaminhos')

    if (req.session.autorizado != true) {
        res.send('É necessário fazer login')
        return
    }
    
    var connection = application.config.dbConnection;
    var JogoModel = new application.app.models.JogoModel(connection);

    var usuario = req.session.usuario;
    JogoModel.getAcoes(usuario, res);

} 

module.exports.ordenar_acao_sudito = function (application, req, res) {
    console.log('jogoController.ordenar_acao_sudito')
    if (req.session.autorizado != true) {
        res.send('É necessário fazer login')
        return
    }
    
    
    var dadosForm = req.body;
    
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();
    
    var erros = req.validationErrors()

    console.log(erros);

    if(erros){
        res.redirect('jogo?msg=A');
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

    var connection = application.config.dbConnection;
    var JogoModel = new application.app.models.JogoModel(connection);

    dadosForm.usuario = req.session.usuario;
    JogoModel.acao(dadosForm);

    res.redirect('jogo?msg=B')
} 

module.exports.revogar_acao = function (application, req, res) {
    console.log('jogoController .revogar_acao')
    
    var url_query = req.query;
    var connection = application.config.dbConnection;
    var JogoModel = new application.app.models.JogoModel(connection);

    var _id = url_query.id_acao;
    JogoModel.revogar_acao(_id, res);

}