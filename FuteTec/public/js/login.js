function fazerLogin(){
    var emailIpt = document.getElementById('login_user');
    var senhaIpt = document.getElementById('login_senha');

    var email = emailIpt.value;
    var senha = senhaIpt.value;

    var qtdErros = 0;

    if (email == ""){
        emailIpt.placeholder = "Digite o seu Email!!!";
        qtdErros += 1;
    }

    if(senha == ""){
        emailIpt.placeholder = "Digite a sua Senha!!!";
        qtdErros += 1;
    }

    if(qtdErros == 0){
        fetch("/index/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify({
                emailLoginServer: email,
                senhaLoginServer: senha
            }),
            
        }).then(function(resposta) {
            if(resposta.ok){
                resposta.json().then(json =>{
                    sessionStorage.EMAIL_USER = json.email;
                    sessionStorage.NOME_USER = json.nome;
                    sessionStorage.ID_USER = json.id;
                    sessionStorage.SENHA_USER = json.senha;
                    sessionStorage.TIME_USER = json.timeUser;
                    sessionStorage.DTNASC_USER = json.dtNasc;
                    sessionStorage.IMG_USER = json.imgPerfil;

                    setTimeout(function(){
                        window.location = '/feed'
                    }, 1000)
                })
            } else{

                console.log("Houve um erro ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                });
            }
        }).catch(function(erro){
            console.log(erro)
        })
        return false
    }

}