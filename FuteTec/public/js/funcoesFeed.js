function criarPublicacao() {
    const formdata = new FormData();

    var legendaPost = document.getElementById('legenda_preview').innerHTML;
    var imgPost = document.getElementById('imagem_post').files[0];

    formData.append('legenda', legendaPost);
    formData.append('imgPost', imgPost);

    fetch("/feed/publicar", {
        method: "POST",
        body: formData
    })
        .then(res => {
            window.location = "feed.html"
        })
        .catch(err => {
            console.log(err);
        })
    }