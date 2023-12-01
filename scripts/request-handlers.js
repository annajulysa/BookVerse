"use strict";
const mysql = require("mysql");
const options = require("./options.json").database;

const createUpdateUser = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var username = req.body.usernameR;
    var mail = req.body.mailR;
    var password = req.body.passwordR;
    var passConfirmed = req.body.passConfirmedR;

    if(req.method == "PUT") {
        sql = mysql.format("UPDATE person SET username = ?, email = ? , pass = ? WHERE id = ?", [username, mail, password, req.params.id]);

    } else {
        if (req.method === "POST") {
            if (password === passConfirmed) {
                sql = mysql.format("INSERT INTO person(username, email, pass) VALUES (?,?,?)", [username, mail, password]);
            }
            //alerta
        }
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

