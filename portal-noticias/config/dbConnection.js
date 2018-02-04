var mysql = require('mysql');

//Wrap de Conexão que evita que o autoload executa a conexão ao carregar
var connMySQL = function () {
  console.log('Conexão com o BD foi estabelecida.')
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'portal_noticias'
  });
};

module.exports = function () {
  console.log('O autoload carregou o módulo de conexão com o BD')
  return connMySQL;
}

//O banco criado tem o seguinte esquema:
// CREATE DATABASE portal_noticias;
// SHOW DATABASES;
// USE portal_noticias;
// CREATE TABLE noticias(
//   id_noticias INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//   titulo VARCHAR(100),
//   noticia TEXT,
//   data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
// SELECT * from noticias;
// INSERT INTO noticias(titulo, noticia) VALUES('titulo da notícia', 'contéudo da notícia');
// ALTER TABLE noticias add column resumo varchar(100);
// ALTER TABLE noticias add column autor varchar(30);
// ALTER TABLE noticias add column data_noticia date;