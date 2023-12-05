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
    constructor(idLivro, idUser, titulo, autor, livroGenero, imagem, dataAdicionado) {
        this.idLivro = idLivro;
        this.idUser = idUser;
        this.titulo = titulo;
        this.autor = autor;
        this.livroGenero = livroGenero;
        this.imagem = imagem;
        this.dataAdicionado = dataAdicionado;
    }
}

class Ranking {
    constructor(livro, totalAdicionados, dataAdicionado) {
        this.livro = livro;
        this.totalAdicionados = totalAdicionados;
        this.dataAdicionado = dataAdicionado;
    }
}

class Information {
    constructor(id) {
        this.id = id;
        this.users = [];
        this.livros = [];
        this.userLivros = [];
        this.detalhes = [];
        this.rankings = [];
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

                        localStorage.setItem('idUser', response.idUser);

                        window.location.href = 'index.html';
                        info.showLivros();
                        
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
            var info = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/livros", true);
            xhr.onreadystatechange = function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    var response = JSON.parse(xhr.responseText);
                    response.data.forEach(function (current) {
                        info.livros.push(current);
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
            var info = this;
            //4 livros por cada row
            for (let i = 0; i < info.livros.length; i += 4) {
                const row = document.createElement('div');
                row.className = 'row';

                for (let j=i; j < i+4 && j < info.livros.length; j++) {
                    const livro = info.livros[j];

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
                                <a href="details.html" onclick="info.getDetalheLivro(${livro.idLivro});">                                                 <span><i class="fa fa-check"></i> ${livro.autor}</span>
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

    
    getDetalheLivro = (idLivro) => {
        var info = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/detalhelivro/" + idLivro, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                debugger;
                console.log(response);
                if (response.data.length > 0) {                    
                    var responseData = response.data[0];  
                    var livro = new Livro(responseData.autor, responseData.titulo, responseData.obra, responseData.personagem, responseData.pagina, responseData.autor, responseData.livroGenero, responseData.imagem);
                    info.detalhes.push(livro);
                } else {
                    console.log("O livro não foi encontrado.");
                }
            } else {
                console.log("Erro na solicitação. Status: " + xhr.status);
            }
        };
        xhr.send();
    };

    showDetalheLivro = () => {
        var info = this;
        const livrosContainer = document.getElementById('detalheLivro');
        console.log(info.detalhes.length);
        const row = document.createElement('div');
            row.className = 'row';

        for (let j=0; j < j < this.detalhes.length; j++) {
            const livro = info.detalhes[j];

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
            row.appendChild(livroElement);  
        }     
        
        livrosContainer.appendChild(row);
    };

    //feito
    adicionarBiblioteca = (idLivro) => {
        var info = this;
        var idUser = localStorage.getItem('idUser');
        var dados = {idLivro:idLivro, idUser: idUser};

        var xhr = new XMLHttpRequest();        
        xhr.responseType="json";
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = xhr.response;

                // verifica a mensagem do servidor
                if (response.message === "OK") {
                    // o livro foi adicionado à biblioteca
                    //var livroUser = new LivroUser(idLivro, idUser, dataAdicionado);
                    //info.userLivro.push(livroUser);
                    console.log("Adicionado");
                } else if (response.message === "Já adicionado à biblioteca") {
                    // livro já está na biblioteca
                    alert("Livro já adicionado à biblioteca");
                } else {
                    console.error("Erro durante a solicitação. Mensagem do servidor: " + response.message);
                }
            } else {
                // Erro de solicitação HTTP
                console.error("Erro durante a solicitação. Código: " + xhr.status);
                console.error("Mensagem de erro do servidor: " + xhr.responseText);
            }
        }
        }
        xhr.open("POST", "/adicionar", true);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(dados));
    };
    
    //feito
    getMinhaBiblioteca = () => {
        var userLivros = this.userLivros;
        var idUser = localStorage.getItem('idUser');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/utilizador/" + idUser, true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);
                if (response.data && Array.isArray(response.data)) {
                    userLivros.length = 0;

                    // Adiciona os novos itens ao array
                    response.data.forEach(function (current) {
                        userLivros.push(current);
                    });
    
                    // Chame a função de callback para mostrar os dados após o carregamento
                    if (info.getMinhaBibliotecaCallback) {
                        info.getMinhaBibliotecaCallback();
                    }
                }
            }
        };
        xhr.send();
    };

    //feito
    showMinhaBiblioteca = () => {
        var userLivros = this.userLivros;
        const livrosContainer = document.getElementById('minhaBibliot');  

        livrosContainer.innerHTML = '';

        if (userLivros.length > 0) {
            userLivros.forEach(function (livro) {
                
                const livroElement = document.createElement('div');
                livroElement.className = 'item';

                livroElement.innerHTML = `
                    <ul>
                        <li><img src="assets/images/${livro.imagem}" alt="" class="templatemo-item"></li>
                        <li><h4>${livro.titulo}</h4><span>${livro.autor}</span></li>
                        <li><h4>Data Adicionada</h4><span>${livro.dataAdicionado}</span></li>
                        <li><h4>Gênero</h4><span>${livro.livroGenero}</span></li>
                        <li><input type="submit" value="Remover" class="btnRemover" onclick="info.removeLivro(${livro.idLivro})"/></li>            
                    </ul>
                `;

                // Adiciona o elemento de lista ao container
                livrosContainer.appendChild(livroElement);

            });
        } else {
            // Adiciona uma mensagem se não houver livros na biblioteca
            livrosContainer.innerHTML = '<p>Nenhum livro na biblioteca.</p>';
        }
    };

    //feito
    removeLivro = (idLivro) => {
        var idUser = localStorage.getItem('idUser');
        var info = this;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/utilizador/"+ idUser +"/livros/"+ idLivro, true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                info.userLivros.splice(info.userLivros.findIndex(i => i.idLivro == idLivro), 1);
                info.showMinhaBiblioteca();
            }
        };
        xhr.send();
    }

    //feito
    rankingLivros = () => {
        var rankings = this.rankings;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/ranking", true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);

                // Verifique se response.data está definido antes de tentar iterar sobre ele
                if (response.data && Array.isArray(response.data)) {
                    response.data.forEach(function (current) {
                        rankings.push(current);
                    });
                }
            }
        };
        xhr.send();
    }

    //feito
    showRanking = () => {
        document.getElementById("divRanking").style.display="block";

        var rankings = this.rankings;

        // Verifique se há dados no ranking
        if (rankings.length > 0) {
            // Seletor do elemento div onde a tabela será criada
            var divRanking = document.getElementById("rankingTabela");

            // Crie a tabela
            var table = document.createElement("table");
            table.className = "ranking-table"; // Adicione uma classe se desejar estilizar a tabela

            // Cabeçalho da tabela
            var thead = document.createElement("thead");
            var headerRow = document.createElement("tr");
            var headers = ["Livro", "Total de Vezes Adicionados"]; // Adicione mais cabeçalhos conforme necessário

            headers.forEach(function (headerText) {
                var th = document.createElement("th");
                th.appendChild(document.createTextNode(headerText));
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Corpo da tabela
            var tbody = document.createElement("tbody");

            rankings.forEach(function (ranking) {
                var row = document.createElement("tr");

                // Adicione mais células conforme necessário
                var livroCell = document.createElement("td");
                livroCell.appendChild(document.createTextNode(ranking.livro));
                row.appendChild(livroCell);

                var totalAdicoesCell = document.createElement("td");
                totalAdicoesCell.appendChild(document.createTextNode(ranking.totalAdicionados));
                row.appendChild(totalAdicoesCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);

            // Adicione a tabela ao divRanking
            divRanking.innerHTML = "";
            divRanking.appendChild(table);
        } else {
            // Se não houver dados no ranking, você pode exibir uma mensagem ou fazer outra ação
            console.log("Sem dados de ranking para exibir.");
        }

    }
}

var info = new Information("divInformation");

window.onload = function ()  {
    
    info.rankingLivros();
    window.info = info;

    if (window.location.pathname === '/index.html') {
        info.showLivros();
        window.info = info;
    }

    if (window.location.pathname === '/details.html') {
        info.showDetalheLivro();
        window.info = info;
    }

    if (window.location.pathname === '/profile.html') {
        info.getMinhaBiblioteca();
        
        info.getMinhaBibliotecaCallback = function() {
            info.showMinhaBiblioteca();
        };
        window.info = info;
    }
};

function isAuthenticated() {
    return localStorage.getItem('idUser') !== null;
}

// Função para realizar o logout
function logout() {
    // Remover dados de sessão
    localStorage.removeItem('idUser');

    // Redirecionar para a página de login (ou outra página)
    window.location.href = 'signin.html';
}

// Verificar se o usuário está autenticado antes de executar qualquer ação
document.addEventListener('DOMContentLoaded', function () {
        // Adicionar um ouvinte de eventos ao botão de logout
    const logoutButton = document.getElementById('btnLogout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});