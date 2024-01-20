"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json").database;

/**
 * Função para rinserir um utilizador novo a BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
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

/**
 * Função para validar o login do utilizador na BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
const validaLogin = (req, res) => {
    var email = req.query.email;
    var pass = req.query.password;

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
                    res.status(200).json(rows); // Retorna os dados do utilizador
                } else {
                    res.sendStatus(401); // Não autorizado (utilizador não encontrado)
                }
            }
        });
    });
}
module.exports.validaLogin = validaLogin;

/**
 * Função para retornar a lista de livros da BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
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

/**
 * Função para retornar as informaçoes de um livro expecifico livro da BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
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

/**
 * Função para associar um utilizador a um ou mais livros na BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
const adicionarBiblioteca = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var idLivro = req.body.idLivro;
    var idUser = req.body.idUser;
    
    var valida = mysql.format("SELECT * FROM Livro_User WHERE idUser=? AND idLivro=?;", [idUser, idLivro]);
    connection.query(valida, function (err, rows) {
        if (err) {
            connection.end();
            res.json({"message": "Erro"});
        } else {
            if (rows.length > 0) {
                // Livro já adicionado à biblioteca
                connection.end();
                res.json({"message": "Já adicionado à biblioteca"});
            } else {
                // Livro não adicionado à biblioteca, faça a inserção
                sql = mysql.format("INSERT INTO Livro_User(idLivro, idUser) VALUES (?,?)", [idLivro, idUser]);
                connection.query(sql, function (err, rows, fields) {
                    connection.end();
                    if (err) {
                        res.sendStatus(404);
                    } else {
                        res.json({"message": "OK"});
                    }
                });
            }
        }
    });
    
}
module.exports.adicionarBiblioteca = adicionarBiblioteca;

/**
 * Função para retornar a lista de livros de um utilizador expecifico da BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
const getLivrosUser = (req, res) => {
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
    var query = mysql.format("SELECT L.idLivro, LU.idUser, L.titulo, L.autor, G.designacao AS livroGenero, L.imagem, LU.dataAdicionado FROM  Livro L JOIN Livro_User LU ON L.idLivro = LU.idLivro JOIN Genero G ON L.genero = G.idGenero WHERE LU.idUser=? order by LU.dataAdicionado;", idUser);
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
module.exports.getLivrosUser = getLivrosUser;

/**
 * Função para os livros que mais forma adicionados pelos utilizadores da BD.
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
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
    var query = mysql.format("SELECT Livro.titulo AS 'livro', COUNT(Livro_User.idLivroUser) AS 'totalAdicionados' FROM Livro JOIN Livro_User ON Livro.idLivro = Livro_User.idLivro GROUP BY Livro.idLivro, Livro.titulo ORDER BY totalAdicionados DESC");
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

/**
 * Função que permite remover a associação de um livro a um utilizador
 * 
 * @param {Object} req pedido do cliente
 * @param {Object} res resposta do servidor
 */
const removerLivro = (req, res) => {
    var idUser = req.params.idUser;
    var idLivro = req.params.idLivro;

    var connection = mysql.createConnection(options);
    connection.connect(function (err) {
        if (err) {
            console.log('Erro ao conectar a base de dados:', err.message);
        } else {
            console.log('Conexão bem-sucedida a base de dados.');
            console.log('Estado da conexão após conectar:', connection.state);
        }
    });
    var query = mysql.format("DELETE FROM Livro_User WHERE idUser=? AND idLivro=?;", [idUser, idLivro]);
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
module.exports.removerLivro = removerLivro;


const atualizarUser = (req, res) => {

}
module.exports.atualizarUser = atualizarUser;




