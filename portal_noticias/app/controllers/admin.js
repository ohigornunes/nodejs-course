module.exports.form_add_noticia = function (application, req, res) {
    res.render('admin/form_add_noticia', { validation: {}, noticia: {} });
}

module.exports.noticias_salvar = function (application, req, res) {

    var noticia = req.body;
    
    //Express Validator
    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracter').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatório').notEmpty();
    // req.assert('data_noticia', 'Data é obrigatório').isISO8601(data_noticia);
    req.assert('noticia', 'Noticia é obrigatório').notEmpty();
    
    console.log(noticia)
    var erros = req.getValidationResult();
    
    erros.then(function (result) {
        if (!result.isEmpty()) { 
            console.log('aqui em then if')
            res.render('admin/form_add_noticia', { validation: result.array(), noticia: noticia });
            return;
        } 
        
        var connection = application.config.dbConnection();
        var noticiasDAO = new application.app.models.NoticiasDAO(connection)
        
        noticiasDAO.salvarNoticia(noticia, function (error, result) {
            console.log('noticiasDAO')
            res.redirect('/noticias')
        });
    })
}

