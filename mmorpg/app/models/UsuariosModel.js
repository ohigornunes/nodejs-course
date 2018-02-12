function UsuariosModel(connection) {
    console.log('UsuariosModel connection ')
    this._connection = connection();
}

UsuariosModel.prototype.inserirUsuario = function(usuario) {
    console.log('UsuariosModel .inserirUsuario ')
    
    this._connection.open( function(err, mongoclient) {
        /* através do mongoclient é que manipulamos as collection e documentos */
        mongoclient.collection("usuarios", function (err, collection) {
            collection.insert(usuario);
            mongoclient.close();
        });
    });
}

UsuariosModel.prototype.autenticar = function(usuario, req, res) {
    console.log('UsuariosModel .autenticar ')
    
    this._connection.open(function(err, mongoclient) {
        mongoclient.collection("usuarios", function(err, collection) {
            collection.find(usuario).toArray(function(err, result){
                console.log(result[0])
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }
                if (req.session.autorizado){
                   res.redirect('jogo');
               } else{
                   res.render('indexView', {validacao: {}});
               }
            });
            mongoclient.close();
        });
    }); 
}


module.exports = function () {
    return UsuariosModel;
}