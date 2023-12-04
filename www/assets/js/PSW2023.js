class User {
    constructor(idUser, username, email, pass) {
        this.idUser = idUser;
        this.username = username;
        this.email = email;
        this.pass = pass;
    }
};


class Livros {
    constructor(idLivro, titulo, obra, personagem, pagina, autor, genero, imagem) {
        this.idLivro = idLivro;
        this.titulo = titulo;
        this.obra = obra;
        this.personagem = personagem;
        this.pagina = pagina;
        this.autor = autor;
        this.genero = genero;
        this.imagem = imagem;
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
        var email = document.getElementById("emailR").value;
        var pass = document.getElementById("passwordR").value;
        var passconf = document.getElementById("passConfirmedR").value;
        
        var person = {id:id, username: username, email: email, pass: pass};

        if(pass === passconf)
        {
            var xhr = new XMLHttpRequest();        
            xhr.responseType="json";

            if (acao === "create") {
                xhr.onreadystatechange = function () {
                    if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                        var newUser = new User(xhr.response.insertId, username, email, pass);
                        info.users.push(newUser);
                        window.location.href = 'index.html';
                        this.showLivros();
                    }
                }
                xhr.open("POST", "/registars", true);
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
        var email = document.getElementById("emailL").value;
        var pass = document.getElementById("passwordL").value;    
        var dados = {id:id, email: email, pass: pass};
    
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";              
    
        xhr.onreadystatechange = function () {        
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    console.log("Resposta completa do servidor:", xhr.response);
        
                    // Certifique-se de que a resposta é um array válido antes de acessar o índice '0'
                    if (xhr.response && xhr.response.length > 0) {
                        var responseData = xhr.response[0];
                        var response = new User(responseData.idUser, responseData.username, responseData.email, responseData.pass);
                        info.users.push(response);
                        console.log(response.idUser);
                        window.location.href = 'index.html';
                    } else {
                        console.error("Erro: A resposta do servidor está vazia ou não está no formato esperado.");
                    }
                } else {
                    alert("Dados de utilizador invalido.");
                    console.error("Erro durante a solicitação. Código: " + this.status);
                    console.error("Mensagem de erro do servidor: " + xhr.responseText);
                }
            }              
        }
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

        const livrosContainer = document.getElementById('listaLivros');

        //4 livros por cada row
        for (let i = 0; i < info.livros.length; i += 4) {
            const row = document.createElement('div');
            row.className = 'row';

            for (let j=i; j < i+4 && j < livros.length; j++) {
                const livro = livros[j];

                const livroElement = document.createElement('div');
                livroElement.className = 'col-lg-3 col-sm-6';

                livroElement.innerHTML = `
                    <div class="item">
                        <div class="thumb">
                            <img src="assets/images/${livro.imagem}" alt="">
                            <div class="hover-effect">
                                <div class="content">
                                    <div class="live">
                                        <input type="button" title="ADD" value="ADD" style="position: absolute; background-color: rgb(224 89 85); color: #fff; font-size: 14px;
                                        padding: 5px 10px; border-radius: 23px; right: 15px; top: 15px; border: none;">
                                    </div>
                                    <ul>
                                        <li><a href="#"><i class="fa fa-book"></i> ${livro.genero}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="down-content">
                            <span><i class="fa fa-check"></i> ${livro.autor}</span>
                            <h4>${livro.titulo}</h4>
                        </div>
                    </div>
                `;

                row.appendChild(livroElement);
            }
            livrosContainer.appendChild(row);
        }
    };
}