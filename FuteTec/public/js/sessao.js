var nome = sessionStorage.NOME_USER;
var email = sessionStorage.EMAIL_USER;
var id = sessionStorage.ID_USER;
var senha = sessionStorage.SENHA_USER;
var time = sessionStorage.TIME_USER;
var dtNasc = sessionStorage.DTNASC_USER;

// var nomeTela = document.querySelectorAll('.nome_do_usuario');
// for(
//     var cont = 0;
//     cont < nomeTela.length;
//     cont += 1
// ){
//     nomeTela[cont].innerHTML = nome;
// }

function validarSessao() {

    if (email != null && nome != null) {

    } else {
        window.location = "index.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "index.html";
}