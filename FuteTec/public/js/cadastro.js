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

    const validNum = /[0-9]/;
    const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validLow = /[a-z]/;
    const validUp = /[A-Z]/;

    var qtdErros = 0;

    if (email == "" || !validEmail.test(email)) {
        emailIpt.value = "";
        erros.innerHTML += `
        <h2>Email inválido!!!</h2>
    `;
    erros.style.display = "flex";        
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
    }
    if (senha == "") {
        qtdErros += 1;
        erros.innerHTML += `
            <h2>Senha em Branco!!!</h2>
        `;
        erros.style.display = "flex";
        setTimeout(fecharErro, 5000);
    }
    if (!validLow.test(senha) || !validUp.test(senha)) {
        senha.value = "";
        erros.innerHTML += `
        <h2>Senha precisa de letras<br>maiúsculas e minúsculas!!!</h2>
    `;
        erros.style.display = "flex";
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
    }
    if (!validNum.test(senha)) {
        senha.value = "";
        erros.innerHTML += `
        <h2>Senha precisa de números!!!</h2>
    `;
        erros.style.display = "flex";
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
    } else if (senha <= 7) {
        senha.value = "";
        erros.innerHTML += `
        <h2>Senha precisa de no mínimo 7 caracteres!!!</h2>
    `;
    erros.style.display = "flex";
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
    }
    if (senha.value != repetirSenha.value) {
        repetirSenha.value = "";
        erros.innerHTML += `
        <h2>As senhas não se repetem!!!</h2>
    `;
    erros.style.display = "flex";
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
    }

    if(timezin == "Selecionar time"){
        erros.innerHTML += `
        <h2>Selecione um time!!!</h2>
    `;
    erros.style.display = "flex";
        qtdErros += 1;
        setTimeout(fecharErro, 5000);
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
                } else {
                    throw "Houve um erro ao tentar se cadastrar!";
                }
            })

            .catch(function (resposta) {
                console.log(`#erro: ${resposta}`);
            });

        return false;
    }
}