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
app.use(express.static("www", {index:'signin.html'}));


// routing

app.post("/logins", requestHandlers.validaLogin); //Esta rota trata as solicitações de login. validaLogin é a função que valida as credenciais
app.post("/user", requestHandlers.registarUser); //solicitações de registro de usuários.
app.get("/user/:id", requestHandlers.getLivrosUser); //busca os livros associados ao utilizador logado
app.post("/livro", requestHandlers.adicionarBiblioteca); // Adiciona um/os livros a tabela userLivro referindo o id do utilizador e o id do livro
app.delete("/user/:idUser/livro/:idLivro", requestHandlers.removerLivro); // remover livro da minha biblioteca 

app.get("/livro", requestHandlers.getLivros); // apresentar todos os livros da bd
app.get("/livro/:id", requestHandlers.getDetalhesLivro); // apresentar os detalhes do livro

app.get("/ranking", requestHandlers.ranking); //Busca as informações de ranking de livros


// start server
app.listen(connectionOptions.port, function () {
    console.log("Server running at http://localhost:" + connectionOptions.port);
});