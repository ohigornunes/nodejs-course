function JogoDAO(connection) {
    console.log('JogoDAO  connection')
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario, comando_invalido) {
    console.log('JogoDAO  .gerarParametros')
    this._connection.open(function (err, mongoclient) {
        /* através do mongoclient é que manipulamos as collection e documentos */
        mongoclient.collection('jogo', function (err, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000),
            });
            mongoclient.close();
        });
    });
} 

JogoDAO.prototype.iniciarJogo = function (res, usuario, casa, comando_invalido ) {
    console.log('JogoDAO  .iniciarJogo')
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('jogo', function (err, collection) {
            collection.find({ usuario: usuario }).toArray(function (err, result) {
                console.log(result[0])
                res.render('jogoView', { img_casa: casa, jogo: result[0], comando_invalido: comando_invalido });

                mongoclient.close();
            });
        }); 
    });
}

module.exports = function() {
    return JogoDAO;
}