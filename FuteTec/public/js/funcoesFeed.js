function carregarFeed() {
    fetch("/feed/listar").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (
                    cont = 0;
                    cont < resposta.length;
                    cont += 1
                ) {
                    var publicacoes = resposta[cont];
                    var feed = document.getElementById('postagens');

                    feed.innerHTML += `
                    <div class="post">
                    <ul class="ucc">
                        <li>
                            <a>
                                <img src="https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg"
                                    class="img-usuario" style="width: 45px; margin-bottom: 15px;">
                            </a>
                        </li>
                        <li>
                            <a onclick="deLike = Number(${publicacoes.idPost});verificarLike()">
                                <img src="assets/icon/soccer-ball.svg" width="45" id="like${publicacoes.idPost}">
                                <p id="qtdLike${publicacoes.idPost}" class="qtd-interacao">0</p>
                            </a>
                        </li>
                        <li>
                            <a onclick="idComentarios = Number(${publicacoes.idPost});abrirComentarios()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                    <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1Z" />
                                </svg>
                                <p  id="qtdComent${publicacoes.idPost}" class="qtd-interacao">0</p>
                            </a>
                        </li>
                    </ul>
                    <div class="conteudo">
                        <h2>${publicacoes.nome}</h2>
        
                        <legend>
                            ${publicacoes.legenda}
                        </legend>

                        <img src="assets/imgsPosts/${publicacoes.imgPost}"
                    class="img-conteudo">
                    </div>
                </div>
                    `;
                }
                setTimeout(likes1, 50);
                setTimeout(listarQtdLikes, 100);
                setTimeout(listarQtdComents, 150);
            })
        }
    })
}

function likes1() {
    var id = sessionStorage.ID_USER;

    fetch("/feed/listarLike", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: id
        }),
    }).then(function (likes) {
        if (likes.ok) {
            likes.json().then(function (likes) {
                console.log("Dados recebidos: ", JSON.stringify(likes));

                for (
                    cont = 0;
                    cont < likes.length;
                    cont += 1
                ) {
                    var listando = likes[cont];

                    var logo = document.getElementById(`like${listando.fkPost}`);

                    logo.src = "assets/icon/iconSite.png";
                    logo.style.width = "55px";

                }
            })
        }
    })
}

function listarQtdLikes(){
    fetch("/feed/listarQtdComent").then(function (likes) {
        if (likes.ok) {
            likes.json().then(function (likes) {
                console.log("Dados recebidos: ", JSON.stringify(likes));

                for (
                    cont = 0;
                    cont < likes.length;
                    cont += 1
                ) {
                    var listandoQtd = likes[cont];

                    var qtdComent = document.getElementById(`qtdComent${listandoQtd.fkPost}`);
                    qtdComent.innerHTML = listandoQtd.qtdComent;
                }
            })
        }
    })
}

function listarQtdComents(){
    fetch("/feed/listarQtdLike").then(function (likes) {
        if (likes.ok) {
            likes.json().then(function (likes) {
                console.log("Dados recebidos: ", JSON.stringify(likes));

                for (
                    cont = 0;
                    cont < likes.length;
                    cont += 1
                ) {
                    var listandoQtd = likes[cont];

                    var qtdLike = document.getElementById(`qtdLike${listandoQtd.fkPost}`);
                    qtdLike.innerHTML = listandoQtd.qtdLikes;
                }
            })
        }
    })
}

var deLike = "";

function verificarLike() {
    var logo = document.getElementById(`like${deLike}`);
    var id = sessionStorage.ID_USER;
    if (logo.src.indexOf("assets/icon/iconSite.png") > -1) {
        //vai deletar o like
        fetch("/feed/tirarLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkPostServer: deLike,
                fkUserServer: id
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var qtdLike = document.getElementById(`qtdLike${deLike}`);
                logo.src = "assets/icon/soccer-ball.svg";
                logo.style.width = "45px";
                qtdLike.innerText = Number(qtdLike.innerText) - 1;
            }
        })
    } else {
        //vai dar o like
        fetch("/feed/darLike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fkPostServer: deLike,
                fkUserServer: id
            }),
        }).then(function (resposta) {
            if (resposta.ok) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var qtdLike = document.getElementById(`qtdLike${deLike}`);
                logo.src = "assets/icon/iconSite.png";
                logo.style.width = "45px";
                qtdLike.innerText = Number(qtdLike.innerText) + 1;
            }
        })
    }
}

var idComentarios = "";

function abrirComentarios() {
    var idUser = sessionStorage.ID_USER;

    fetch("/feed/abrirComentario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkPostServer: idComentarios
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            var comentarios = document.getElementById('comentarios');
            comentarios.innerHTML = ``;
            comentarios.innerHTML += `
                <div class="comentario-outro">
                    <br>
                    Sem Comentários
                    <br>
                </div>
            `;
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                comentarios.innerHTML = ``;
                for (
                    cont = 0;
                    cont < resposta.length;
                    cont += 1
                ) {
                    var comentario = resposta[cont];
                    var classe = "comentario-outros";

                    if (comentario.fkUser == idUser) classe = "comentario-eu";

                    comentarios.innerHTML += `
                    <div class="${classe}">
                    <h2>${comentario.nome}</h2>
                        <br>
                        ${comentario.coment}
                        <br>
                    </div>
                    `;
                }
            })
        } 
    }).catch(err => {
        console.log(err); 
        comentarios.innerHTML = ``;

        comentarios.innerHTML += `
                <div class="${classe}">
                    <br>
                    Sem Comentários
                    <br>
                </div>
            `;
    })
}

function enviarComentario(){
    var id = sessionStorage.ID_USER;
    var comentario = document.getElementById('comentario_eu').value;

    fetch("/feed/enviarComentario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id,
            comentarioServer: comentario,
            postServer: idComentarios
        }),
    }).then(function (likes) {
        if (likes.ok) {
            setTimeout(abrirComentarios, 200);
            
        }
    })
}

function criarPublicacao() {
    const formData = new FormData();

    var legendaPost = document.getElementById('legenda_preview').innerHTML;
    var imgPost = document.getElementById('imagem_post');

    var id = sessionStorage.ID_USER;

    formData.append('legenda', legendaPost);
    formData.append('imgPost', imgPost.files[0]);
    formData.append('id', id);



    fetch("/feed/publicar", {
        method: "POST",
        body: formData
    })
        .then(res => {
            window.location = "feed.html";
        })
        .catch(err => {
            console.log(err);
        })
}