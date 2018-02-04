/** Importar as configurações do servidor */
var app = require('./config/server');

/** Paramentizar a porta de escuta */
app.listen(8080, function() {
    console.log('====================================');
    console.log('    .:::SERVIDOR INCIALIZADO:::.'   );
    console.log('====================================');
})
