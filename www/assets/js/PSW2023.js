/** 
* @class Estrutura com capacidade de armazenar o estado da entidade utilizador 
* @constructs User
* @param {int} idUser - id do utilizador
* @param {string} username - nome da utilizador
* @param {string} email - email do utilizador
* @param {string} pass - password do utilizador
*/
class User {
    constructor(idUser, username, email, pass) {
        this.idUser = idUser;
        this.username = username;
        this.email = email;
        this.pass = pass;
    }
};
/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade livro 
* @constructs Livro
* @param {int} idLivro - id do livro
* @param {string} titulo - titulo do livro
* @param {string} obra - texto sobre a obra do livro
* @param {string} personagem - texto sobre o personagem do livro
* @param {string} autor - autor do livro
* @param {idGenero} idGenero - id do genero do livro
* @param {string} livroGenero - designação do genero do livro
* @param {string} imagem - nome da imagem do livro - para localizaocao
* @param {int} gosots - quantidade de pessoas que adicionaram à sua biblioteca
*/
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
/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade livroUser 
* @constructs LivroUser
* @param {int} idLivro - id do livro
* @param {int} iidUser - id do utilizador
* @param {string} titulo - titulo do livro
* @param {string} autor - autor do livro
* @param {string} livroGenero - designação do genero do livro
* @param {string} imagem - nome da imagem do livro - para localizaocao
* @param {Date} dataAdicionado - data do dia em que o utilizador adicionou o livro à sua biblioteca
*/
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
/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Person
* @param {string} livro - nome do livro
* @param {int} totalAdicionados - quantidade de pessoas que tem adicionado o livro
* @param {int} dataAdicionado - data do dia em que o utilizador adicionou o livro à sua biblioteca - para ordenar
*/
class Ranking {
    constructor(livro, totalAdicionados, dataAdicionado) {
        this.livro = livro;
        this.totalAdicionados = totalAdicionados;
        this.dataAdicionado = dataAdicionado;
    }
}

/** 
* @class Guarda toda informação necessaria na execução do site 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* @property {string} id - id do elemento HTML que contém a informação.
* @property {users[]} users - Array de objetos do tipo User, para guardar todas as informações do utilizador do nosso sistema
* @property {livros[]} livros - Array de objetos do tipo Livro, para guardar todos os livros da base de dados
* @property {userLivros[]} userLivros - Array de objetos do tipo LivroUser, para guardar todos livros do utilizador
* @property {detalhes[]} detalhes - Array de objetos do tipo Livro, para guardar todas as informações do livro que irão aparecer na Pagina detalhes
* @property {rankings[]} rankings - Array de objetos do tipo Ranking, para guardar o os livros mais adicionados, e consequentimente utilizado para fazer o ranking 
*/
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
    /**
     * Função que regista o utilizador na base de dados atraves do petodo POST e depois é redirecionado para a pagina login, para assim conseguir aceder ao site
     * Nesta função também é feito a validação das passwords para assim finalizar a função
     * @memberof Information
     * @param {string} acao - Ação a ser executada, por exemplo, "create" para criar um novo utilizador.
     */
    registarUser = (acao) => {
        // Referência à instância da classe Information
        var info = this;
        // Obtém os valores dos campos do formulário de registro
        var id = document.getElementById("id").value;
        var username = document.getElementById("usernameR").value;
        var email = document.getElementById("emailR").value;
        var pass = document.getElementById("passwordR").value;
        var passconf = document.getElementById("passConfirmedR").value;
        // Cria um objeto com os dados do utilizador
        var person = {id:id, username: username, email: email, pass: pass}; 

        // Verifica se as senhas coincidem
        if(pass === passconf)
        {
            // Cria uma instância do objeto XMLHttpRequest para realizar solicitações assíncronas
            var xhr = new XMLHttpRequest();        
            xhr.responseType="json";

            if (acao === "create") {
                // Define a função de retorno de chamada para ser executada quando o estado da solicitação muda
                xhr.onreadystatechange = function () {
                    if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                        // guard a resposta JSON do servidor
                        var newUser = new User(xhr.response.insertId, username, email, pass);
                        // Adiciona o novo utilizador à lista de utilizadores da instância
                        info.users.push(newUser);
                        window.location.href = 'signin.html';
                    }
                }
                // Configura a solicitação POST para o servidor
                xhr.open("POST", "/user", true);
            }
            // Envia a solicitação para o servidor, incluindo os dados do novo utilizador em formato JSON
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(person));
        } else {
            // Se as passwords não coincidirem, exibe um alerta
            alert("Password invalida.");
        }                
    };

    //feito
    /**
     * Função que obtem as informações de id, email e senha do formulário de login e envia uma solicitação ao servidor NODE.JS de forma assíncrona e em JSON.
     * Caso o utilizador seja invalido será lançado um alerta
     * @memberof Information
     */
    processingLogin() {        
        var info = this;
        // Obtém os valores dos campos email e senha do formulário de login        
        var email = document.getElementById("emailL").value;
        var pass = document.getElementById("passwordL").value;
               
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";              
    
        xhr.onreadystatechange = function () {        
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    console.log("Resposta completa do servidor:", xhr.response);
        
                    // Verifica se a resposta do servidor é um array não vazio
                    if (xhr.response && xhr.response.length > 0) {
                        var responseData = xhr.response[0];
                        // Cria uma instância do objeto User com os dados do utilizador
                        var response = new User(responseData.idUser, responseData.username, responseData.email, responseData.pass);
                        // Adiciona o utilizador à lista de utilizadors na instância da classe Information
                        info.users.push(response);
                        // Armazena o id do utilizador no armazenamento local
                        localStorage.setItem('idUser', response.idUser);                        
                        localStorage.setItem('username', response.username);                        
                        window.location.href = 'index.html';
                        // Exibe todos os livros da bd após o login
                        info.showLivros();
                        
                    } else {
                        // Exibe um erro se a resposta do servidor estiver vazia ou não estiver no formato esperado
                        console.error("Erro: A resposta do servidor está vazia ou não está no formato esperado.");
                    }
                } else {
                    // Exibe um alerta e mensagens de erro se a solicitação não for bem-sucedida (dados invalidos)
                    alert("Dados de utilizador invalido.");
                    console.error("Erro durante a solicitação. Código: " + this.status);
                    console.error("Mensagem de erro do servidor: " + xhr.responseText);
                }
            }   
        }
        // Configura a solicitação POST para o endpoint /user no servidor
        xhr.open('GET', `/user?email=${email}&password=${pass}`, true);    
        // Define o cabeçalho Content-Type da solicitação como application/json
        xhr.setRequestHeader('Content-Type', 'application/json');
        // Envia os dados do utilizador
        xhr.send();
    };

    editarUser() {

    }

    //feito
    /**
     * Função assíncrona para obter todos os dados dos livros do servidor.
     * Faz uma solicitação GET para o endpoint /livros no servidor e popula a lista de livros da instância da classe Information.
     * @memberof Information
     * @returns {Promise} Uma Promise que é resolvida quando a operação é concluída com sucesso.
     */
    getLivros = () => {
        return new Promise((resolve, reject) => {
            var info = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "/livro", true);
            xhr.onreadystatechange = function () {
                if ((this.readyState === 4) && (this.status === 200)) {
                    var response = JSON.parse(xhr.responseText);
                    // Lê novamente os dados da resposta e adiciona cada livro à lista de livros da instância
                    response.data.forEach(function (current) {
                        info.livros.push(current);
                    });
                    // Resolve a Promise, indicando que a operação foi concluída com sucesso
                    resolve();
                }
            };
            xhr.send();
        });
    };

    //feito
    /**
     * funcao assíncrona para exibir a lista de livros na página. Obtém os livros assincronamente, cria elementos HTML dinâmicos para cada livro e adiciona à página.
     * Os livros são exibidos em linhas, cada linha contendo até 4 livros.
     */
    showLivros = () => {
        // invoca a função assincrona getLivros() para obter a lista de livros
        this.getLivros().then(() => {
            //variavel com o id da tag onde iremos apresentar as informações
            const livrosContainer = document.getElementById('listaLivros');
            var info = this;
            //4 livros por linha
            for (let i = 0; i < info.livros.length; i += 4) {

                // Cria um elemento de row 
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
                                <a href="details.html" onclick="info.getDetalheLivro(${livro.idLivro});"><span><i class="fa fa-check"></i> ${livro.autor}</span>
                                    <h4 id="xpto">${livro.titulo}</h4>
                                </a>
                            </div>
                        </div>
                    `;
                    // Adiciona o elemento do livro à row
                    row.appendChild(livroElement);
                }
                // Adiciona a row completa ao contêiner de livros
                livrosContainer.appendChild(row);
            }
        });        
    };

    /**
     * Função que é invocada quando o utilizador clica em algum livro e que obtem de forma assíncrona as informações completas de um livro do servidor com base no id do livro.
     * @param {number} idLivro - O id do livro para o qual detalhes estão sendo solicitados.
     * @memberof Information
     */    
    getDetalheLivro = (idLivro) => {
        var info = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/livro/" + idLivro, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                debugger;
                console.log(response);

                // Verifica se há dados na resposta
                if (response.data.length > 0) {                    
                    var responseData = response.data[0];  
                    var livro = new Livro(responseData.autor, responseData.titulo, responseData.obra, responseData.personagem, responseData.pagina, responseData.autor, responseData.livroGenero, responseData.imagem);
                    // Adiciona o livro ao array 'detalhes' na instância Information                  
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
    /**
     * Função que apresenta a pagina "Detalhes" do livro. as informações são apresentadas dentro de uma tad div com o id detalheLivro e depois é criado todo o layout da pagina
     */
    showDetalheLivro = () => {
        var info = this;
        const livrosContainer = document.getElementById('detalheLivro');
        console.log(info.detalhes.length);
        const row = document.createElement('div');
            row.className = 'row';

        for (let j=0; j < this.detalhes.length; j++) {
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
    /**
     * Função responsável por enviar uma solicitação para adicionar um livro à biblioteca do utilizador.
     * @param {number} idLivro - O id do livro a ser adicionado à biblioteca.
     */
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
                    alert("Adicionado à biblioteca");
                } else if (response.message === "Já adicionado à biblioteca") {
                    // livro já está na biblioteca
                    alert("Já existente na biblioteca");
                } else {
                    console.error("Erro durante a solicitação. Mensagem do servidor: " + response.message);
                }
            } else {
                // Erro de solicitação HTTP
                console.error("Erro durante a solicitação. Código: " + xhr.status);
                console.error("Mensagem de erro do servidor: " + xhr.responseText);
            }}
        }
        xhr.open("POST", "/livro", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(dados));
    };
    
    //feito
    /**
     * Função responsável por obter a biblioteca pessoal do utilizador a partir do servidor.
     * Os dados obtidos são armazenados no array userLivros.
     */
    getMinhaBiblioteca = () => {
        // Obtém a referência para o array userLivros e o id do utilizador armazenado localmente
        var userLivros = this.userLivros;
        var idUser = localStorage.getItem('idUser');
        var xhr = new XMLHttpRequest();

        var username = localStorage.getItem('username');
        document.getElementById("namePerfil").textContent = username;

        xhr.open("GET", "/user/" + idUser, true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);
                if (response.data && Array.isArray(response.data)) {
                    userLivros.length = 0;

                    // Adiciona os novos itens ao array
                    response.data.forEach(function (current) {
                        userLivros.push(current);
                    });
    
                    // Chama a função de callback para mostrar os dados após o carregamento
                    if (info.getMinhaBibliotecaCallback) {
                        info.getMinhaBibliotecaCallback();
                    }
                }
            }
        };
        xhr.send();
    };

    //feito
    /**
     * Função que apresenta uma lista dos livros que utilizador tem em sua biblioteca por meio de um ciclo sobre o array userLivros
     */
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
    /**
     * Função responsável por remover um livro da biblioteca do utilizador.
     * Realiza uma solicitação HTTP DELETE ao servidor para remover a associação do livro ao utilizador.
     * Atualiza o array userLivros e exibe a biblioteca novamente.
     * @param {number} idLivro - O id do livro a ser removido.
     */
    removeLivro = (idLivro) => {
        var idUser = localStorage.getItem('idUser');
        var info = this;
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/user/"+ idUser +"/livro/"+ idLivro, true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                // Remove o livro do array userLivros com id do livro
                info.userLivros.splice(info.userLivros.findIndex(i => i.idLivro == idLivro), 1);
                // Atualiza a exibição da biblioteca do utilizador
                info.showMinhaBiblioteca();
            }
        };
        xhr.send();
    }

    //feito
    /**
     * Função responsável por obter o ranking de livros por meio de uma solicitação HTTP GET ao servidor.
     * Atualiza o array rankings com os dados do ranking recebidos.
     */
    rankingLivros = () => {
        var rankings = this.rankings;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/ranking", true);
        xhr.onreadystatechange = function () {
            if ((this.readyState === 4) && (this.status === 200)) {
                var response = JSON.parse(xhr.responseText);

                // Verifique se response.data está definido antes de tentar iterar sobre ele
                if (response.data && Array.isArray(response.data)) {
                    // Lê os dados do ranking e os adiciona ao array rankings
                    response.data.forEach(function (current) {
                        rankings.push(current);
                    });
                }
            }
        };
        xhr.send();
    }

    //feito
    /**
     * Função responsável por exibir o ranking de livros em uma tabela HTML. A tabela é criada dinamicamente com base nos dados do array rankings. 
     * Se não houver dados no ranking, exibe uma mensagem no console.
     */
    showRanking = () => {
        // Exibe o elemento divRanking
        document.getElementById("divRanking").style.display="block";

        var rankings = this.rankings;

        // Verifique se há dados no ranking
        if (rankings.length > 0) {
            // Seletor do elemento div onde a tabela será criada
            var divRanking = document.getElementById("rankingTabela");

            // Crie a tabela
            var table = document.createElement("table");
            table.className = "ranking-table";

            // Cabeçalho da tabela
            var thead = document.createElement("thead");
            var headerRow = document.createElement("tr");
            var headers = ["Livro", "Total de Vezes Adicionados"];

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
                
                var livroCell = document.createElement("td");
                livroCell.appendChild(document.createTextNode(ranking.livro));
                row.appendChild(livroCell);

                var totalAdicoesCell = document.createElement("td");
                totalAdicoesCell.appendChild(document.createTextNode(ranking.totalAdicionados));
                row.appendChild(totalAdicoesCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);

            // Tabela adicionada ao divRanking
            divRanking.innerHTML = "";
            divRanking.appendChild(table);
        } else {
            // Se não houver dados no ranking, exibe uma mensagem
            console.log("Sem dados de ranking para exibir.");
        }

    }
}

// Cria uma instância da classe Information com o ID do elemento HTML divInformation
var info = new Information("divInformation");

/**
 * Executa a função quando a página está totalmente carregada
 * Solicita ao servidor o ranking de livros e outros metodos de forma assíncrona
 * Verifica qual é a página atual é e de acordo com a pagina exibe as informações das funções shows()
 * @memberof window
 */
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
        // Executa o metodo que busca os livros do user de forma assíncrona
        info.getMinhaBiblioteca();
        // Define uma função de retorno de chamada para exibir os livros
        info.getMinhaBibliotecaCallback = function() {
            info.showMinhaBiblioteca();
        };
        window.info = info;
    }
};

function isAuthenticated() {
    return localStorage.getItem('idUser') !== null;
}

/**
 * Função para realizar o logout
 */ 
function logout() {
    // Remover dados de sessão
    localStorage.removeItem('idUser');
    localStorage.removeItem('username');
    // Redirecionar para a página de login (ou outra página)
    window.location.href = 'signin.html';
}

/**
 * Verificar se o utilizador está autenticado antes de executar qualquer ação
 */ 
document.addEventListener('DOMContentLoaded', function () {
    // Adicionar um ouvinte de eventos ao botão de logout
    const logoutButton = document.getElementById('btnLogout');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});