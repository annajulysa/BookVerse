"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json").database;


const registarUser = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var username = req.body.username;
    var mail = req.body.mail;
    var password = req.body.pass;
    
    if(req.method == "POST") {
        sql = mysql.format("INSERT INTO user(username, email, pass) VALUES (?,?,?)", [username, mail, password]);
    }
    connection.query(sql,function (err, rows, fields) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });
    connection.end();    
}
module.exports.registarUser = registarUser;


const validaLogin = (req, res) => {
    var mail = req.body.mail;
    var password = req.body.password;

    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });

    var query = mysql.format("SELECT * FROM user WHERE email=? and pass=?", [mail, password]);
    connection.query(query, function (err, rows) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });    
    connection.end();  
}
module.exports.validaLogin = validaLogin;


const getLivros = (req, res) => {
    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("SELECT l.idLivro, l.titulo, l.autor, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero");
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "Erro" });
        } else {
            res.json({"message": "OK", "data": rows });
        }
    }); 
}
module.exports.getLivros = getLivros;

const atualizarUser = () => {

}
module.exports.atualizarUser = atualizarUser;

const removerLivro = () => {

}
module.exports.removerLivro = removerLivro;

const getLivrosUser = () => {

}
module.exports.getLivrosUser = getLivrosUser;

