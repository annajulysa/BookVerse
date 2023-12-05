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

app.get("/utilizador/:id", requestHandlers.getLivrosUser);
app.get("/ranking", requestHandlers.ranking);

app.get("/livros", requestHandlers.getLivros); // apresentar todos os livros da bd
app.get("/detalhelivro/:id", requestHandlers.getDetalhesLivro); // apresentar os detalhes do livro
app.post("/adicionar", requestHandlers.adicionarBiblioteca);

//app.get("/utilizador/:id/livros/:id", requestHandlers.getLivrosUser); //apresentar todos os livros da minha biblioteca
app.delete("/utilizador/:idUser/livros/:idLivro", requestHandlers.removerLivro); // remover livro da minha biblioteca*/


// start server
app.listen(connectionOptions.port, function () {
    console.log("Server running at http://localhost:" + connectionOptions.port);
});