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
app.post("/logins", requestHandlers.validaLogin);
app.post("/registars", requestHandlers.registarUser); 
app.get("/livros", requestHandlers.getLivros); // apresentar todos os livros da bd

app.get("/livro/:id", requestHandlers.getLivro); // apresentar os detalhes do livro
/*app.post("/adicionar", requestHandlers.adicionarBiblioteca);
app.put("/utilizador/:id", requestHandlers.atualizarUser); //atualizar no no user
app.get("/utilizador/:id/livros/:id", requestHandlers.getLivrosUser); //apresentar todos os livros da minha biblioteca
app.delete("/utilizador/:id/livros/:id", requestHandlers.removerLivro); // remover livro da minha biblioteca*/


// start server
app.listen(connectionOptions.port, function () {
    console.log("Server running at http://localhost:" + connectionOptions.port);
});