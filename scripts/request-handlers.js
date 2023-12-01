"use strict";
const mysql = require("mysql");
const options = require("./options.json").database;

const createUpdateUser = (req, res) => {
    var connection = mysql.createConnection(options);

    var username = req.body.username;
    

    var sql;
}

