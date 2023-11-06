function cadastrar() {
    var nomeIpt = document.getElementById('nome-cadastro');
    var emailIpt = document.getElementById('email-cadastro');
    var timezin = document.getElementById('time-cadastro').value;
    var senhaIpt = document.getElementById('senha-cadastro');
    var repetirSenhaIpt = document.getElementById('repetir-senha-cadastro');
    var dtNasc = document.getElementById('data-cadastro').value;

    var nome = nomeIpt.value;
    var email = emailIpt.value;
    var senha = senhaIpt.value;
    var repetirSenha = repetirSenhaIpt.value;

    const validNum = /[0-9]/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validLow = /[a-z]/;
    const validUp = /[A-Z]/;

    var qtdErros = 0;

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
        fetch("/index/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,
                dtNascServer: dtNasc,
                timeServer: timezin
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    var caixaLogin = document.getElementById('div_login');
                    var caixaCadastro = document.getElementById('div_cadastro');

                    caixaCadastro.style.transform = 'translateY(0%)';
                    caixaLogin.style.transform = 'translateY(0%)';

                    nome.value = "";
                    email.value = "";
                    senha.value = "";
                    repetirSenha.value = "";
                    dtNasc = "";
                    time = "";
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