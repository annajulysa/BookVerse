"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json").database;

const createUpdateUser = (req, res) => {
    var connection = mysql.createConnection(options);
    var sql;
    var username = req.body.username;
    var mail = req.body.mail;
    var password = req.body.password;
    var passConfirmed = req.body.passConfirmed;

    console.log(username+' - '+mail )
    
    if(req.method == "POST") {
        sql = mysql.format("INSERT INTO user(username, email, pass) VALUES ('?','?','?')", [username, mail, password]);
    } /*else {
        if (req.method === "PUT") {
            sql = mysql.format("UPDATE user SET username = ?, email = ? , pass = ? WHERE id = ?", [username, mail, password, req.params.id]);

        }
    }*/
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

