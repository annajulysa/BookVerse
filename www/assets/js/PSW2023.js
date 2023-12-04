class User {
    constructor(id, username, mail, pass) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.pass = pass;
    }
};

class Livros {
    constructor(id, title, obra, personagem, pagina, autor, genero) {
        this.id = id;
        this.title = title;
        this.obra = obra;
        this.personagem = personagem;
        this.pagina = pagina;
        this.autor = autor;
        this.genero = genero;
    }
};

window.onload = (event) => {
    var info = new Information("divInformation");
    window.info = info;
};

class Information {
    constructor(id) {
        this.id = id;
        this.users = [];
        this.livros = [];
    }

    // feito
    registarUser = (acao) => {
        var info = this;
        var id = document.getElementById("id").value;
        var username = document.getElementById("usernameR").value;
        var mail = document.getElementById("mailR").value;
        var pass = document.getElementById("passwordR").value;
        var passconf = document.getElementById("passConfirmedR").value;
        
        var person = {id:id, username: username, mail: mail, pass: pass};

        if(pass === passconf)
        {
            var xhr = new XMLHttpRequest();        
            xhr.responseType="json";

            if (acao === "create") {
                xhr.onreadystatechange = function () {
                    if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                        var newUser = new User(xhr.response.insertId, username, mail, pass);
                        info.users.push(newUser);
                        window.location.href = 'index.html';
                    }
                }
                xhr.open("POST", "/registar", true);
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(person));
        } else {
            alert("Password invalida.");
        }                
    }

    //validar login
    processingLogin() {
        var info = this;
        var id = document.getElementById("idLogin").value;
        var mail = document.getElementById("mailL").value;
        var password = document.getElementById("passwordL").value;    
        var dados = {id:id, mail: mail, password: password};
    
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";        
        
    
        xhr.onreadystatechange = function () {        
            if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var response = new User(xhr.response.insertId, mail, password);
                info.users.push(response);
                window.location.href = 'index.html';
                console.log(response.mail);
            } else {
                console.error("Erro durante a solicitação:", xhr.status, xhr.statusText);
            }        
        };
        xhr.open("POST", "/logins", true); 
    
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(dados));        
                
    }

    getLivro = () => {
        var livros = this.livros;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/livros", true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);
                response.data.forEach(function(current){
                    livros.push(current);
                });
            }
        };
        xhr.send();
    };

    showLivros = () => {
        this.getLivro();

        setTimeout(() => {
            const listaLivrosElement = document.getElementById('listaLivros');
            listaLivrosElement.innerHTML = '';
            this.livros.forEach(livro => {
                const livroElement = document.createElement('div');
                livroElement.innerHTML = `<p>${livro.title} - ${livro.autor}</p>`;
                listaLivrosElement.appendChild(livroElement);
            });
        }, 500);

        document.addEventListener('DOMContentLoaded', function () {
            showLivros();
        });
    };
}