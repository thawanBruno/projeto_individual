var formularioCadastro = document.getElementById("form_cadastro");

formularioCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrar();
});

function cadastrar() {
    var erros = document.getElementById('erros_login');
    erros.innerHTML = "";
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

    if (email == "") {
        emailIpt.value = "";
        erros.innerHTML += `
            <h2>Email inválido!!!</h2>
        `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
    }

    if (senha == "") {
        qtdErros += 1;
        erros.innerHTML += `
            <h2>Senha em Branco!!!</h2>
        `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
        return false;
    }

    if (senha.length < 8) {
        senha.value = "";
        erros.innerHTML += `
        <h2>Senha precisa de no mínimo 8 caracteres!!!</h2>
    `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
        return false;
    }

    if (senha != repetirSenha) {
        repetirSenha.value = "";
        erros.innerHTML += `
            <h2>As senhas não se repetem!!!</h2>
    `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
        return false;
    }

    if (timezin == "Selecionar time") {
        erros.innerHTML += `
        <h2>Selecione um time!!!</h2>
    `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
        return false;
    }

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
                } else {
                    throw "Houve um erro ao tentar se cadastrar!";
                }
            })

            .catch(function (resposta) {
                console.log(`#erro: ${resposta}`);
                erros.innerHTML += `
        <h2>Email já está sendo utilizado!!!</h2>
    `;
                erros.style.display = "flex";
                qtdErros += 1;
                setTimeout(fecharErro, 5000);
            });

        return false;
    }
