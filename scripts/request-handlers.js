"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json").database;


const createUpdateUser = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var username = req.body.username;
    var mail = req.body.mail;
    var password = req.body.pass;
    var passConfirmed = req.body.passConfirmed;
    
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
module.exports.createUpdateUser = createUpdateUser;


const getUser = (req, res) => {
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

    var query = mysql.format("SELECT email, pass FROM user WHERE email=? and pass=?", [mail, password]);
    connection.query(query, function (err, rows) {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(rows);
        }
    });    
    connection.end();  
}
module.exports.getUser = getUser;