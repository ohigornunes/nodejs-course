var http = require('http');

var opções = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'get',
    headers: {
        // 'Accept' : 'text/html'
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}

//Content Type
//x-www-form-urlencoded
// var html = 'nome-jose'
// var json = { nome: 'José'}
// var string_json = JSON.stringify(json);

var buffet_corpo_reposta = [];

var req = http.request(opções, function(res) {

    res.on('data', function(pedaco) {
        buffet_corpo_reposta.push(pedaco);
    });
 
    res.on('end', function() {
        var corpo_resposta = Buffer.concat(buffet_corpo_reposta).toString();
        console.log(corpo_resposta);
        console.log(res.statusCode)
    });

    // res.on('error', function() {
    // 
    // })
});

// req.write(string_json)
req.end();