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

class LivroUser{
    constructor(idLivro, idUser) {
        this.idLivro = idLivro;
        this.idUser = idUser;
    }
}

class Perfil {
    constructor(idLivro, username, email, idUser, titulo, autor, imagem, livroGenero) {
        this.idLivro = idLivro;
        this.idUser = idUser;
        this.username = username;
        this.email = email;
        this.titulo = titulo;
        this.autor = autor;
        this.imagem = imagem;
        this.livroGenero = livroGenero;
    }
}

window.onload = (event) => {
    var info = new Information("divInformation");   
    info.showLivros(); 
    info.showMinhaBiblioteca();
    //info.showDetalheLivro();
    window.info = info;
};


class Information {
    constructor(id) {
        this.id = id;
        this.users = [];
        this.livros = [];
        this.perfils = [];
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
                        window.location.href = 'signin.html';
                    }
                }
                xhr.open("POST", "/registars", true);
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(person));
        } else {
            alert("Password invalida.");
        }                
    };

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

                        localStorage.setItem('idUser', response.idUser);

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
    };

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
                                            padding: 5px 10px; border-radius: 23px; right: 15px; top: 15px; border: none;" onclick="info.adicionarBiblioteca(${livro.idLivro});">
                                        </div>
                                        <ul>
                                            <li><a href="#"><i class="fa fa-book"></i> ${livro.livroGenero}</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="down-content">
                                <a href="details.html?idLivro=${livro.idLivro}" onclick="info.showDetalheLivro(${livro.idLivro});">             
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
        return new Promise((resolve, reject) => {
            var livros = this.livros;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/detalhelivro/" + idLivro, true);
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


        /*return new Promise((resolve, reject) => {
            var info = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/detalhelivro/" + idLivro, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
    
                    if (response.data.length > 0) {
                        var responseData = response.data[0];
                        var livro = new Livro(responseData.idLivro, responseData.titulo, responseData.obra, responseData.personagem, responseData.pagina, responseData.autor, /*responseData.idGenero, responseData.livroGenero, responseData.imagem, responseData.gostos);
                        info.livros.push(livro);
                        resolve(livro);
                    } else {
                        reject("O livro não foi encontrado.");
                    }
                } else {
                    reject("Erro na solicitação. Status: " + xhr.status);
                }
            };
            xhr.send();
        });*/
    }

    showDetalheLivro = (idLivro) => {
        this.getDetalheLivro(idLivro).then(() => {
            var livros = this.livros;

            const livrosContainer = document.getElementById('detalheLivro');

            for (let j=0; j < j < livros.length; j++) {
                const livro = livros[j];
            
                const row = document.createElement('div');
                row.className = 'row';

                const livroElement = document.createElement('div');
                livroElement.innerHTML = `
                    <div class="col-lg-6">
                        <div class="left-info">
                            <div class="left">
                                <h4>Classificação</h4>
                                <span>Gostos</span>
                            </div>
                            <ul>
                                <li id="classificacao"><i class="fa fa-star"></i> 5</li>
                                <li id="gostosDL"><i class="fa fa-heart" aria-hidden="true"></i> 2.3M</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="right-info">
                            <ul>                        
                                <li id="autorDL"><i class="fa fa-heart" aria-hidden="true">${livro.autor}</i></li>
                                <li id="paginasDL"><i class="fa fa-server">${livro.pagina}</i></li>
                                <li id="generoDL"><i class="fa fa-book">${livro.livroGenero}</i></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <img id="imagemDL" src="assets/images/${livro.imagem}" alt="" style="border-radius: 23px; margin-bottom: 30px;">
                    </div> 
                    <div class="col-lg-8">
                        <br>
                        <h6 id="tituloDL">${livro.titulo}</h6>
                        <p id="personagemDL">${livro.personagem}</p>
                        <br><p>
                        </p><h6>A Obra</h6>
                        <p id="obraDL">${livro.obra}</p>
                        <p></p><!--<br><br><br>
                        <h6>Páginas: 184 <br>Autor Maurice Leblanc</h6>-->
                    </div>
                `;            
            }  
            
            row.appendChild(livroElement);
            livrosContainer.appendChild(row);

        }).catch((error) => {
            console.error(error);
        }); 
    };

    //feito
    adicionarBiblioteca = (idLivro) => {
        var info = this;
        var idUser = localStorage.getItem('idUser');
        var dados = {idLivro:idLivro, idUser: idUser};

        var xhr = new XMLHttpRequest();        
        xhr.responseType="json";
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var response = new LivroUser(idLivro, idUser);
                info.userLivro.push(response);
            }
        }
        xhr.open("POST", "/adicionar", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(dados));
    };

    processingProfile = () => {
        var idUser = localStorage.getItem('idUser');
        var usernameElement = document.getElementById('usernameP');
    
        console.log("Iniciando solicitação para o perfil do usuário com ID:", idUser);
    
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/utilizador/" + idUser, true);
        xhr.onreadystatechange = function () {
            console.log("Estado da solicitação:", xhr.readyState);
            if (xhr.readyState === 4) {
                console.log("Resposta completa do servidor:", xhr.responseText);
    
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
    
                    if (response.data.length > 0) {
                        var responseData = response.data[0];
                        var perfil = new Perfil(
                            responseData.idUser,
                            responseData.username,
                            responseData.email,
                            responseData.idLivro,
                            responseData.titulo,
                            responseData.autor,
                            responseData.autor,
                            responseData.imagem,
                            responseData.livroGenero
                        );
    
                        console.log("Perfil obtido com sucesso:", perfil);
    
                        // Atualize a interface do usuário com as informações do perfil
                        usernameElement.innerHTML = perfil.username;
                    }
                } else {
                    console.error("Erro na solicitação. Status:", xhr.status);
                }
            }
        };
        xhr.send();
    };
    

    showMinhaBiblioteca = async () => {
        try {
            // Aguarde a conclusão do processamento do perfil
            const perfil = await this.processingProfile();
    
            const livrosContainer = document.getElementById('minhaBibliot');
            var livros = this.livros;
    
            for (let i = 0; i < livros.length; i++) {
                const livro = livros[i];
    
                const livroElement = document.createElement('div');
                livroElement.className = 'item';
    
                livroElement.innerHTML = `
                    <ul>
                        <li><img src="assets/images/${livro.imagem}" alt="" class="templatemo-item"></li>
                        <li><h4>${livro.titulo}</h4><span>${livro.autor}</span></li>
                        <li><h4>Data Adicionada</h4><span>24/08/2036</span></li>
                        <li><h4>Gênero</h4><span>${livro.livroGenero}</span></li>
                        <li><h4>Perfil</h4><span>${perfil ? perfil.username : 'N/A'}</span></li>                
                    </ul>
                `;
                livrosContainer.appendChild(livroElement);
            }
        } catch (error) {
            console.error(error);
        }
    };
}