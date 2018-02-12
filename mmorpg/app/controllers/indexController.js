module.exports.index = function (application, req, res) {
    console.log('indexController .index')
    res.render('indexView', { validacao: {} });
}

module.exports.autenticar = function (application, req, res) {
    console.log('indexController .autenticar')

    var dadosForm = req.body;

    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();

    // var errors = req.validationErrors(true);
    // if (errors) {

    //     return res.json({
    //         success: false,
    //         errors: errors
    //     });

    // }


    req.asyncValidationErrors().catch(function (errors) {
        if (errors) {
            res.render('indexView', { validacao: errors });
            console.log(errors)
            return;
        };
    });
    
    console.log(dadosForm)

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    
    UsuariosDAO.autenticar(dadosForm, req, res);
    //res.send('podemos criar ')

}