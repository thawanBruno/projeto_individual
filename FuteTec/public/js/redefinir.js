// var nome = sessionStorage.NOME_USER;
// var email = sessionStorage.EMAIL_USER;
// var id = sessionStorage.ID_USER;
// var senha = sessionStorage.SENHA_USER;
var time = sessionStorage.TIME_USER;
// var dtNasc = sessionStorage.DTNASC_USER;

red_nome_user.value = nome;
red_email_user.value = email;
red_senha_user.value = senha;
var dtNasc2 = dtNasc.split('T');
red_dt_nasc_user.value = dtNasc2[0];

timeCoracao.innerHTML = time;

const formularioComent = document.getElementById('form_redefinir');

formularioComent.addEventListener('submit', (event) => {
    event.preventDefault();
    redefinir();
})

if (time == "Santos") {
    escudos_usar.innerHTML = `
        <img src="./assets/images/santos_novo.png" width="50" onclick="inserirEscudo('santos_novo.png')">
        <img src="./assets/images/santos_antigo.png" width="50" onclick="inserirEscudo('santos_antigo.png')">
    `;
}

if (time == "Palmeiras") {
    escudos_usar.innerHTML = `
        <img src="./assets/images/palmeiras_novo.png" width="50" onclick="inserirEscudo('palmeiras_novo.png')">
        <img src="./assets/images/palmeiras_antigo.png" width="50" onclick="inserirEscudo('palmeiras_antigo.png')">
    `;
}

if (time == "São-Paulo") {
    escudos_usar.innerHTML = `
        <img src="./assets/images/sao_paulo_novo.png" width="50" onclick="inserirEscudo('sao_paulo_novo.png')">
        <img src="./assets/images/sao_paulo_antigo.png" width="50" onclick="inserirEscudo('sao_paulo_antigo.png')">
    `;
}

if (time == "Flamengo") {
    escudos_usar.innerHTML = `
        <img src="./assets/images/flamengo_novo.png" width="50" onclick="inserirEscudo('flamengo_novo.png')">
        <img src="./assets/images/flamengo_antigo.png" width="50" onclick="inserirEscudo('flamengo_antigo.png')">
    `;
}

if (time == "Corinthians") {
    escudos_usar.innerHTML = `
        <img src="./assets/images/corinthians_novo.png" width="50" onclick="inserirEscudo('corinthians_novo.png')">
        <img src="./assets/images/corinthians_antigo.png" width="50" onclick="inserirEscudo('corinthians_antigo.png')">
    `;
}

function inserirEscudo(caminho) {
    var id = sessionStorage.ID_USER;
    fetch("/configuracao/inserirEscudo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: id,
            imgServer: caminho
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            escudos();
        }
    });
}

function redefinir() {
    var id = sessionStorage.ID_USER;
    var nomeIpt = document.getElementById('red_nome_user');
    var emailIpt = document.getElementById('red_email_user');
    var timezin = document.getElementById('red_time_cadastro').value;
    var senhaIpt = document.getElementById('red_senha_user');
    var repetirSenhaIpt = document.getElementById('red_senha2_user');
    var dtNasc1 = document.getElementById('red_dt_nasc_user').value;
    var imgPerfil = document.getElementById('img_perfil');

    var usuario = [];


    var nome = nomeIpt.value;
    var email = emailIpt.value;
    var senha = senhaIpt.value;
    var repetirSenha = repetirSenhaIpt.value;

    usuario.push(nome);
    usuario.push(email);
    usuario.push(senha);
    usuario.push(repetirSenha);


    const formData = new FormData();

    formData.append('nome', nome);
    if (imgPerfil.files[0] != undefined) formData.append('imgPerfil', imgPerfil.files[0]);
    formData.append('id', id);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dtNasc', dtNasc1)
    formData.append('time', timezin);

    const validNum = /[0-9]/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validLow = /[a-z]/;
    const validUp = /[A-Z]/;

    var qtdErros = 0;

    if (usuario[1] == "" || !validEmail.test(usuario[1])) {
        emailIpt.value = "";
        emailIpt.placeholder = "Email Inválido";
        qtdErros += 1;
    }
    if (usuario[2] == "") {
        senhaIpt.placeholder = "Digite uma senha!";
        qtdErro += 1;
    }
    if (!validLow.test(usuario[2]) || !validUp.test(usuario[2])) {
        senhaIpt.value = "";
        senhaIpt.placeholder = "A senha deve possuir letras maiuscúlas e minúsculas!";
        qtdErros += 1;
    }
    if (!validNum.test(usuario[2])) {
        senhaIpt.value = "";
        senhaIpt.placeholder = "A senha deve possuir números!";
        qtdErros += 1;
    } else if (usuario[2] <= 7) {
        senhaIpt.value = "";
        senhaIpt.placeholder = "A senha deve possuir mais de 8 caractéres!";
        qtdErros += 1;
    }

    if (usuario[2] != usuario[3]) {
        if (usuario[3] == "") {
            qtdErros -= 1;
        } else {
            repetirSenhaIpt.value = "";
            repetirSenhaIpt.placeholder = "As senhas Não se repetem!";
        }
        qtdErros += 1;
    }


    if (qtdErros == 0 && imgPerfil.files[0] != undefined) {
        fetch("/configuracao/redefinir", {
            method: "POST",
            body: formData
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
                if (resposta.ok) {
                    resposta.json().then(json => {
                        sessionStorage.EMAIL_USER = email;
                        sessionStorage.NOME_USER = nome;
                        sessionStorage.SENHA_USER = senha;
                        sessionStorage.TIME_USER = timezin;
                        sessionStorage.DTNASC_USER = dtNasc1;
                        sessionStorage.IMG_USER = json.imgPerfil;
                    })
                    window.location = "/configuracao";
                } else {
                    throw "Houve um erro ao tentar se cadastrar!";
                }
            })

            .catch(function (resposta) {
                console.log(`#erro: ${resposta}`);
            });

        return false;
    } else {
        fetch("/configuracao/redefinir2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                dtNascServer: dtNasc,
                timeServer: timezin,
                idServer: id
            })
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    sessionStorage.EMAIL_USER = email;
                    sessionStorage.NOME_USER = nome;
                    sessionStorage.SENHA_USER = senha;
                    sessionStorage.TIME_USER = timezin;
                    sessionStorage.DTNASC_USER = dtNasc1;

                    window.location = "/configuracao";

                } else {
                    throw "Houve um erro ao tentar se cadastrar!";
                }
            })
            .catch(function (resposta) {
                console.log(`#erro: ${resposta}`);
            })

        return false;
    }
}


function deletarConta() {
    var id = sessionStorage.ID_USER;
    fetch(`/configuracao/deletar/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            window.location = "/index"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    })
    return false;
}

function fazerMudanca() {
    mensagem_alerta.style.display = "flex";
}

var qtdEscudos = 0;

function escudos() {
    escudos_usando.innerHTML = ``;
    var id = sessionStorage.ID_USER;

    fetch("/configuracao/escudos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: id
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var tamanho = resposta.length;
                var listaEscudos = document.getElementById('escudos_usando');

                for (
                    var cont = 0;
                    cont < tamanho;
                    cont += 1
                ) {
                    var dados = resposta[cont];

                    listaEscudos.innerHTML += `
                        <img src="./assets/images/${dados.imgEscudo}" width="50">
                `;
                }
                qtdEscudos = cont;
            });
        }
    });
}
