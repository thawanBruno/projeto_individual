function  carregarFeed(){
    fetch("/feed/listar").then(function (resposta) {
        if(resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for(
                    cont = 0;
                    cont < resposta.length;
                    cont += 1
                ){
                    var publicacoes = resposta[cont];
                    var feed = document.getElementById('postagens');

                    feed.innerHTML +=  `
                    <div class="post">
                    <ul class="ucc">
                        <li>
                            <a>
                                <img src="https://blog.unyleya.edu.br/wp-content/uploads/2017/12/saiba-como-a-educacao-ajuda-voce-a-ser-uma-pessoa-melhor.jpeg"
                                    class="img-usuario" style="width: 45px; margin-bottom: 15px;">
                            </a>
                        </li>
                        <li>
                            <a>
                                <img src="assets/icon/soccer-ball.svg" width="45">
                                <p class="qtd-interacao">000</p>
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                                    <path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 21a9 9 0 1 0-9-9c0 1.488.36 2.89 1 4.127L3 21l4.873-1c1.236.639 2.64 1 4.127 1Z" />
                                </svg>
                                <p class="qtd-interacao">000</p>
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
                
            })
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