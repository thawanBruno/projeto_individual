// var nome = sessionStorage.NOME_USER;
// var email = sessionStorage.EMAIL_USER;
// var id = sessionStorage.ID_USER;
// var senha = sessionStorage.SENHA_USER;
// var time = sessionStorage.TIME_USER;
// var dtNasc = sessionStorage.DTNASC_USER;

red_nome_user.value = nome;
red_email_user.value = email;
red_senha_user.value = senha;
var dtNasc2 = dtNasc.split('T');
red_dt_nasc_user.value = dtNasc2[0];

function redefinir() {
    var nomeIpt = document.getElementById('red_nome_user');
    var emailIpt = document.getElementById('red_email_user');
    var timezin = document.getElementById('red_time_cadastro').value;
    var senhaIpt = document.getElementById('red_senha_user');
    var repetirSenhaIpt = document.getElementById('red_senha2_user');
    var dtNasc1 = document.getElementById('red_dt_nasc_user').value;
    var imgPerfil = document.getElementById('img_perfil');

    var nome = nomeIpt.value;
    var email = emailIpt.value;
    var senha = senhaIpt.value;
    var repetirSenha = repetirSenhaIpt.value;

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('imgPerfil', imgPerfil.files[0]);
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

    if(timezin == "Selecione o seu time"){
        qtdErros += 1;
    }
    if (email == "" || !validEmail.test(email)) {
        emailIpt.value = "";
        emailIpt.placeholder = "Email Inválido";
        qtdErros += 1;
    }
    if (senha == "") {
        senhaIpt.placeholder = "Digite uma senha!";
        qtdErro += 1;
    }
    if (!validLow.test(senha) || !validUp.test(senha)) {
        senha.value = "";
        senha.placeholder = "A senha deve possuir letras maiuscúlas e minúsculas!";
        qtdErros += 1;
    }
    if (!validNum.test(senha)) {
        senha.value = "";
        senha.placeholder = "A senha deve possuir números!";
        qtdErros += 1;
    } else if (senha <= 7) {
        senha.value = "";
        senha.placeholder = "A senha deve possuir mais de 8 caractéres!";
        qtdErros += 1;
    }
    if (senha.value != repetirSenha.value) {
        repetirSenha.value = "";
        repetirSenha.placeholder = "As senhas Não se repetem!";
        qtdErros += 1;
    }

    if (qtdErros == 0) {
        fetch("/configuracao/redefinir", {
            method: "POST",
            body: formData
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    sessionStorage.EMAIL_USER = email;
                    sessionStorage.NOME_USER = nome;
                    sessionStorage.SENHA_USER = senha;
                    sessionStorage.TIME_USER = timezin;
                    sessionStorage.DTNASC_USER = dtNasc1;

                    resposta.json().then(json =>{
                        sessionStorage.IMG_USER = json.imgPerfil;
                    })

                    window.location = "/configuracao";

                } else{
                    throw "Houve um erro ao tentar se cadastrar!";
                }
            })

            .catch(function (resposta){
                console.log(`#erro: ${resposta}`);
            });

            return false;
    }
}