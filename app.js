"use strict";

// imports 
const express = require("express");
const bodyParser = require("body-parser");
const requestHandlers = require("./scripts/request-handlers.js");
const connectionOptions = require("./scripts/connectionOptions.json").server;

// start app
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));


// routing
//app.get("/sensor", requestHandlers.getSensors);
//app.get("/sensor/:id/sample", requestHandlers.getSamples);
app.post("/user", requestHandlers.createUpdateUser);
//app.put("/user/:id", requestHandlers.createUpdateUser);



// start server
app.listen(connectionOptions.port, function () {
    console.log("Server running at http://localhost:" + connectionOptions.port);
});