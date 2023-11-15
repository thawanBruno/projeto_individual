var nome = sessionStorage.NOME_USER;
var email = sessionStorage.EMAIL_USER;
var id = sessionStorage.ID_USER;
var senha = sessionStorage.SENHA_USER;
var time = sessionStorage.TIME_USER;
var dtNasc = sessionStorage.DTNASC_USER;
var imgPerfil = sessionStorage.IMG_USER;


function validarSessao() {

    if (email != null && nome != null) {
        var nomeTela = document.querySelectorAll('.nome_do_usuario');
        var imgTela = document.querySelectorAll('.img_do_usuario');
        for (
            var cont = 0;
            cont < nomeTela.length || cont < imgTela.length;
            cont += 1
        ) {
            if(nomeTela.length > 0) nomeTela[cont].innerHTML = nome;
            if(imgPerfil.length > 0) imgTela[cont].src = `./assets/imgsPerfil/${imgPerfil}`;
        }
    } else {
        window.location = "index.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "index.html";
}