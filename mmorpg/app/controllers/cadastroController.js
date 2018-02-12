module.exports.cadastro = function(application, req, res) {
    console.log('cadastroController  .cadastro')
    res.render('cadastroView', { validacao: {}, dadosForm: {} });  
}

module.exports.cadastrar = function(application, req, res) {
    console.log('cadastroController .cadastrar')
    var dadosForm = req.body;

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();
    
    var erros = req.validationErrors();

    if(erros){ 
        res.render('cadastroView', { validacao: erros, dadosForm: dadosForm});
        return; 
    }  

    var connection = application.config.dbConnection;
    var UsuariosModel = new application.app.models.UsuariosModel(connection);
    var JogoModel = new application.app.models.JogoModel(connection);
    
    UsuariosModel.inserirUsuario(dadosForm)
    JogoModel.gerarParametros(dadosForm.usuario)

    res.send('Podemos cadastar');
}