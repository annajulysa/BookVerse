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
        connection.end(); 

        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });       
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
        connection.end(); 

        if (err) {
            res.json({"message": "Erro" });
        } else {
            res.json({"message": "OK", "data": rows });
        }
    }); 
}
module.exports.getLivros = getLivros;


const getDetalhesLivro = (req, res) => {
    var idLivro = req.params.id;

    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("SELECT l.*, g.designacao as 'livroGenero' FROM livro l inner join genero g on l.genero = idGenero WHERE idLivro=?", idLivro);
    connection.query(query, function (err, rows) {
        connection.end(); 

        if (err) {            
            res.json({"message": "Erro" });
        } else {            
            res.json({"message": "OK", "data": rows });
            console.log(rows);
        }
    }); 
}
module.exports.getDetalhesLivro = getDetalhesLivro;


const adicionarBiblioteca = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var idLivro = req.body.idLivro;
    var idUser = req.body.idUser;
    
    if(req.method == "POST") {
        sql = mysql.format("INSERT INTO Livro_User(idLivro, idUser) VALUES (?,?)", [idLivro, idUser]);
    }
    connection.query(sql,function (err, rows, fields) {
        connection.end(); 

        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });  
}
module.exports.adicionarBiblioteca = adicionarBiblioteca;


const getPerilUser = (req, res) => {
    var idUser = req.params.id;

    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("SELECT U.idUser, U.username, U.email, LU.idLivro, L.titulo, L.autor, L.imagem, G.designacao as 'livroGenero' FROM Livro_User LU JOIN User U ON LU.idUser = U.idUser JOIN Livro L ON LU.idLivro = L.idLivro JOIN Genero G ON L.genero = G.idGenero WHERE idUser=?", idUser);
    connection.query(query, function (err, rows) {
        connection.end(); 

        if (err) {            
            res.json({"message": "Erro" });
        } else {            
            res.json({"message": "OK", "data": rows });
        }
    }); 
}
module.exports.getPerilUser = getPerilUser;


const ranking = (req, res) => {
    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("SELECT Livro.titulo AS 'livro', COUNT(Livro_User.idLivroUser) AS 'totalAdicoes' FROM Livro JOIN Livro_User ON Livro.idLivro = Livro_User.idLivro GROUP BY Livro.idLivro, Livro.titulo ORDER BY totalAdicoes DESC;");
    connection.query(query, function (err, rows) {
        connection.end(); 

        if (err) {            
            res.json({"message": "Erro" });
        } else {            
            res.json({"message": "OK", "data": rows });
            console.log(rows);
        }
    }); 

}
module.exports.ranking = ranking;






const atualizarUser = (req, res) => {

}
module.exports.atualizarUser = atualizarUser;

const removerLivro = (req, res) => {

}
module.exports.removerLivro = removerLivro;


