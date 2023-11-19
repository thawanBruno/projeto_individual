var idSeguidor = sessionStorage.VAR_APOIO;
var id = sessionStorage.ID_USER;

function deixarSeguir(){
    var verificacao = document.getElementById('btn_seguir').innerText;
    if(verificacao == "Seguir"){
        fetch("/seguidor/seguir", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idSeg: idSeguidor,
                idUser: id
            }),
        }).then(function (resposta){
            console.log("resposta: ", resposta);
            if(resposta.ok){
                document.getElementById('btn_seguir').innerText = "Deixar de Seguir";
            }
        })
    } else{
        fetch("/seguidor/dixarSeguir", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idSeg: idSeguidor,
                idUser: id
            }),
        }).then(function (resposta){
            console.log("resposta: ", resposta);
            if(resposta.ok){
                document.getElementById('btn_seguir').innerText = "Seguir";
            }
        })
    }
    carregarQtdSeguidores()
}

function carregarInformacoes() {
    fetch("/seguidor/informacoes", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: idSeguidor
        }),
    }).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var dados = resposta[0];
                
                document.getElementById('imagem_seguidor').src = `./assets/imgsPerfil/${dados.imgPerfil}`;
                document.getElementById('nome_seguidor').innerText = dados.nome;
                
            });
            verificarSeguidor()
        }
    })
}

function verificarSeguidor(){
    fetch("/seguidor/verificar", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idSeg: idSeguidor,
            idUser: id
        }),
    }).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var dados = resposta[0];

                if(dados.verificacao == 1){
                    document.getElementById('btn_seguir').innerText = "Deixar de Seguir";
                } else{
                    document.getElementById('btn_seguir').innerText = "Seguir";
                }
                
            });
            carregarQtdSeguidores()
        }
    })
}

function carregarQtdSeguidores() {
    fetch("/seguidor/seguidores", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: idSeguidor
        }),
    }).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var dados = resposta[0];
            
                document.getElementById('qtd_seguidores').innerText = dados.qtdSeguidores;
            });
            carregarQtdSeguindo()
        }
    })
}

function carregarQtdSeguindo() {
    fetch("/seguidor/seguindo", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: idSeguidor
        }),
    }).then(function (resposta){
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var dados = resposta[0];
                
                document.getElementById('qtd_seguindo').innerText = dados.qtdSeguindo;
            });
            carregarFeedSeguidor()
        }
    })
}

function carregarFeedSeguidor() {
    fetch("/seguidor/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: idSeguidor
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var docQtdPosts = document.getElementById('qtd_posts')

                for (
                    cont = 0;
                    cont < resposta.length;
                    cont += 1
                    ) {
                        var feed = document.getElementById('postagens');
                        var publicacoes = resposta[cont];

                    feed.innerHTML += `
                    <div class="post">
                    <ul class="ucc">
                        <li>
                            <a>
                                <img src="./assets/imgsPerfil/${publicacoes.imgPerfil}"
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
                docQtdPosts.innerHTML = cont;
                setTimeout(likes1, 50);
                setTimeout(listarQtdLikes, 100);
                setTimeout(listarQtdComents, 150);
            })
        }
    })
}