class User {
    constructor(idUser, username, email, pass) {
        this.idUser = idUser;
        this.username = username;
        this.email = email;
        this.pass = pass;
    }
};

class Livro {
    constructor(idLivro, titulo, obra, personagem, pagina, autor, idGenero, livroGenero, imagem, gostos) {
        this.idLivro = idLivro;
        this.titulo = titulo;
        this.obra = obra;
        this.personagem = personagem;
        this.pagina = pagina;
        this.autor = autor;
        this.idGenero = idGenero;
        this.livroGenero = livroGenero;
        this.imagem = imagem;
        this.gostos = gostos;
    }
};

class LivroUser {
    constructor(idLivro, idUser) {
        this.idLivro = idLivro;
        this.idUser = idUser;
    }
}

window.onload = (event) => {
    var info = new Information("divInformation");
    info.showLivros();
    window.info = info;
};


class Information {
    constructor(id) {
        this.id = id;
        this.users = [];
        this.livros = [];
        this.userLivro = [];
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

    //feito
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
        
                    // verificar se a resposta é um array
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

    //feito
    getLivros = () => {
        return new Promise((resolve, reject) => {
            var livros = this.livros;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/livros", true);
            xhr.onreadystatechange = function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    var response = JSON.parse(xhr.responseText);
                    response.data.forEach(function (current) {
                        livros.push(current);
                    });
                    resolve();
                }
            };
            xhr.send();
        });
    };

    //feito
    showLivros = () => {
        this.getLivros().then(() => {
            const livrosContainer = document.getElementById('listaLivros');
            var livros = this.livros;
            //4 livros por cada row
            for (let i = 0; i < this.livros.length; i += 4) {
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
                                            <li><a href="#"><i class="fa fa-book"></i> ${livro.livroGenero}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <a href="javascript: info.getDetalheLivro(${livro.idLivro});">             
                                    <span><i class="fa fa-check"></i> ${livro.autor}</span>
                                    <h4 id="xpto">${livro.titulo}</h4>
                                </a>
                            </div>
                        </div>
                    `;
                    row.appendChild(livroElement);
                }
                livrosContainer.appendChild(row);
            }
        });        
    };

    //feito
    getDetalheLivro = (idLivro) => {
        var info = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/livro/" + idLivro, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
    
                if (response.data.length > 0) {
                    var responseData = response.data[0];
                    var livro = new Livro(responseData.idLivro, responseData.titulo, responseData.obra, responseData.personagem, responseData.pagina, responseData.autor, responseData.livroGenero, responseData.imagem);
                    info.livros.push(livro);
                    info.showDetalheLivro(livro.idLivro);
                }
            } else {
                console.error("Erro na solicitação. Status:", xhr.status);
            }
        };
        xhr.send();
    }

    showDetalheLivro = (idLivro) => {
        var livro = info.livros.find(l => l.idLivro === idLivro);

        // Verificar se o livro foi encontrado
        try {
            // Redirecionar para a página de detalhes antes de atualizar os elementos
            window.location.href = 'details.html?idLivro=' + livro.idLivro;

            // Atualizar os elementos na página de detalhes com as informações do livro
            var gostos = document.getElementById('gostosDL');
            var autor = document.getElementById('autorDL');
            var paginas = document.getElementById('paginasDL');
            var genero = document.getElementById('generoDL');
            var imagem = document.getElementById('imagemDL');
            var titulo = document.getElementById('tituloDL');
            var personagem = document.getElementById('personagemDL');
            var obra = document.getElementById('obraDL');

            // Certifique-se de que a propriedade 'pagina' existe no seu objeto livro
            // Caso contrário, substitua pelo nome correto da propriedade
            paginas.innerHTML = livro.pagina || '';

            // Atualizar os outros elementos
            titulo.innerText = livro.titulo;
            autor.innerText = livro.autor;
            genero.innerHTML = livro.livroGenero;
            imagem.innerHTML = livro.imagem;
            personagem.innerHTML = livro.personagem;
            obra.innerHTML = livro.obra;

        } catch (error) {
            console.error(error);
        }       
    }

    /*adicionarBiblioteca = (idLivro) => {
        var info = this;
        var id = document.getElementById("id").value;
        var dados = {id:id, idLivro:idLivro};

        var xhr = new XMLHttpRequest();        
        xhr.responseType="json";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var newLivro = new LivroUser();
                info.users.push(newLivro);
                this.showLivros();
            }
        }
        xhr.open("POST", "/adicionar", true);

    }*/
}