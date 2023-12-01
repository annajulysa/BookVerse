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
        //var id = document.getElementById("id").value;
        var username = document.getElementById("usernameR").value;
        var mail = document.getElementById("mailR").value;
        var pass = document.getElementById("passwordR");
console.log(username, mail, pass);
        var person = {id:id, username: username, mail: mail, pass: pass};

        var xhr = new XMLHttpRequest();        
        xhr.responseType="json";

        if (acao === "create") {
            xhr.onreadystatechange = function () {
                if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                    var newUser = new User(username, mail, pass);
                    info.users.push(newUser);
                    info.showPerson();
                }
            }
            xhr.open("POST", "http://localhost:8081/user", true);
        } /*else if (acao === "update") {
            xhr.onreadystatechange = function () {
                if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                    info.users.splice(info.users.findIndex(i => i.id == id), 1);
                    info.users.push(person);
                    info.showPerson();
                }
            }
            xhr.open("PUT", "http://localhost:8081/user/"+ id, true);
        }*/
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(person));
    }
}