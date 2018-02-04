module.exports.noticias = function (application, req, res ) {
    var connection = application.config.dbConnection()
    var noticiasDAO = new application.app.models.NoticiasDAO(connection)
    
    noticiasDAO.getNoticias(function (error, result) {
        res.render('noticias/noticias', { noticias: result })
    });
}

module.exports.noticia = function (application, req, res) {
    var connection = application.config.dbConnection();
    var noticiasDAO = new application.app.models.NoticiasDAO(connection);
    // console.log(req.query)
    var id_noticia = req.query;
    
    noticiasDAO.getNoticia(id_noticia, function (error, result) {
        console.log('noticiasDAO.getNoticia')
        res.render('noticias/noticia', { noticia: result })
    });
}


