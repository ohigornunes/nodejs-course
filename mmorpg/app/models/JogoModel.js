var ObjectID = require('mongodb').ObjectId;

function JogoModel(connection) {
    console.log('JogoModel  connection')
    this._connection = connection();
}

JogoModel.prototype.gerarParametros = function(usuario, comando_invalido) {
    console.log('JogoModel  .gerarParametros')
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

JogoModel.prototype.iniciarJogo = function (res, usuario, casa, msg ) {
    console.log('JogoModel  .iniciarJogo')
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('jogo', function (err, collection) {
            collection.find({ usuario: usuario }).toArray(function (err, result) {
                console.log(result[0])
                res.render('jogoView', { img_casa: casa, jogo: result[0], msg: msg });
                
                mongoclient.close();
            });
        }); 
    });
}

JogoModel.prototype.acao = function (acao) {
    console.log('JogoModel  .acao');
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('acao', function (err, collection) {
            var date = new Date();
            var tempo = null;
            switch (parseInt(acao.acao)) {
                case 1: tempo = 1 * 60 * 60000;
                    break;
                case 2: tempo = 2 * 60 * 60000;
                    break;
                case 3: tempo = 5 * 60 * 60000;
                    break;
                case 4: tempo = 5 * 60 * 60000;
                    break;
                default:
                    break;
            }
            acao.acao_termina_em = date.getTime() + tempo;
            collection.insert(acao);
        });
        mongoclient.collection('jogo', function (err, collection) {
            
            var moedas = null;
            
            switch (parseInt(acao.acao)) {
                case 1: moedas = -2 * acao.quantidade;
                    break;
                case 2: moedas = -3 * acao.quantidade;
                    break;
                case 3: moedas = -1 * acao.quantidade;
                    break;
                case 4: moedas = -1 * acao.quantidade;
                    break;
                default:
                    break;
            }
            collection.update(
                { usuario: acao.usuario},
                { $inc: {moeda: moedas}}
            );
            mongoclient.close();
        });
    });
}

JogoModel.prototype.getAcoes = function (usuario, res) {
    console.log('JogoModel  .getAcoes');
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('acao', function (err, collection) {
            var date = new Date();
            var momento_atual = date.getTime();
            collection.find({ usuario: usuario, acao_termina_em: {$gt: momento_atual} }).toArray(function (err, result) {
                
                res.render('pergaminhosView', { acoes: result })
                
                mongoclient.close();
            });
        });
    });
}

JogoModel.prototype.revogar_acao = function (_id, res) {
    console.log('JogoModel  .getAcoes');
    this._connection.open(function (err, mongoclient) {
        mongoclient.collection('acao', function (err, collection) {
            collection.remove(
                { _id: ObjectID(_id) },
                function(err, result) {
                    res.redirect('jogo?msg=D');
                    mongoclient.close();
                }
            )
        });
    });
}

module.exports = function() {
    return JogoModel;
}