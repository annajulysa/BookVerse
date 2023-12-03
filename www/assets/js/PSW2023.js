class User {
    constructor(id, username, mail, pass) {
        this.id = id;
        this.username = username;
        this.mail = mail;
        this.pass = pass;
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
    }

    processingUser = (acao) => {
        var info = this;
        var id = document.getElementById("id").value;
        var username = document.getElementById("usernameR").value;
        var mail = document.getElementById("mailR").value;
        var pass = document.getElementById("passwordR").value;
        console.log(username, mail, pass);
        var person = {id:id, username: username, mail: mail, pass: pass};

        var xhr = new XMLHttpRequest();        
        xhr.responseType="json";

        if (acao === "create") {
            xhr.onreadystatechange = function () {
                if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                    var newUser = new User(xhr.response.insertId, username, mail, pass);
                    info.users.push(newUser);
                }
            }
            xhr.open("POST", "/registar", true);
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(person));
    }
}

function processingLogin() {
    var mail = document.getElementById("mailL").value;
    var password = document.getElementById("passwordL").value;

//    var dados = {mail: mail, pass: password};

    var xhr = new XMLHttpRequest();        
    xhr.open("POST", "/logins", true);

    xhr.onreadystatechange = function () {        
        if ((this.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            console.log(response);
        } else {
            console.error("Erro durante a solicitação:", xhr.status, xhr.statusText);
        }        
    }; 

    xhr.setRequestHeader('Content-Type', 'application/json');
    var request = JSON.stringify({ "mail": mail, "password": password });
    xhr.send(request);        
}