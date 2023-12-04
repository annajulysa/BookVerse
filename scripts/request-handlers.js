"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json").database;


const registarUser = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.pass;
    
    if(req.method == "POST") {
        sql = mysql.format("INSERT INTO user(username, email, pass) VALUES (?,?,?)", [username, email, password]);
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
    var email = req.body.email;
    var pass = req.body.pass;

    var connection = mysql.createConnection(options);
    connection.connect((err) => {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
            res.sendStatus(500); // Internal Server Error
            return;
        }

        console.log('Conexão bem-sucedida a base de dados.');
        console.log('Estado da conexão após conectar:', connection.state);

        const query = mysql.format("SELECT * FROM user WHERE email=? and pass=?", [email, pass]);
        
        connection.query(query, (err, rows) => {
            connection.end(); // Fecha a conexão após a execução da consulta

            if (err) {
                console.error('Erro durante a consulta:', err.message);
                res.sendStatus(500); // Internal Server Error
            } else {
                if (rows.length > 0) {
                    console.log(JSON.stringify(rows));
                    res.status(200).json(rows); // Retorna os dados do usuário
                } else {
                    res.sendStatus(401); // Não autorizado (usuário não encontrado)
                }
            }
        });
    });
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
    var query = mysql.format("SELECT l.idLivro, l.titulo, l.autor, l.imagem, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero");
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "Erro" });
        } else {
            res.json({"message": "OK", "data": rows });
        }
    }); 
}
module.exports.getLivros = getLivros;


const getLivro = () => {
    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("SELECT * FROM livro");
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({"message": "Erro" });
        } else {
            res.json({"message": "OK", "data": rows });
        }
    }); 
}
module.exports.getLivro = getLivro;









const atualizarUser = () => {

}
module.exports.atualizarUser = atualizarUser;

const removerLivro = () => {

}
module.exports.removerLivro = removerLivro;

const getLivrosUser = () => {

}
module.exports.getLivrosUser = getLivrosUser;

