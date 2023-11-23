var timeUser = sessionStorage.TIME_USER;

// quantidade totais de torcedores de uma torcida em específico
var totCorinthians = 0;
var totFlamenguistas = 0;
var totSantos = 0;
var totSaoPaulo = 0;
var totPalmeiras = 0;

//quantidade totais de seguidores do usuários que torcem para uma torcida em específico 
var totCorinthiansUser = 0;
var totFlamenguistasUser = 0;
var totSantosUser = 0;
var totSaoPauloUser = 0;
var totPalmeirasUser = 0;

//Métricas dos posts
var totLikes = 0;
var TotComents = 0;
var totPosts = 0;

//Interações totais dos times e indicador do quanto o usuário é imparcial ou fanático
var likesCorinthians = 0;
var LikesFlamengo = 0;
var likesSantos = 0;
var likesSaoPaulo = 0;
var likesPalmeiras = 0;

var comentsCorinthians = 0;
var comentsFlamengo = 0;
var comentsSantos = 0;
var comentsSaoPaulo = 0;
var comentsPalmeiras = 0;


function obterDados() {
    var id = sessionStorage.ID_USER;
    fetch("/dashboard/obterDados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idserver: id
        }),
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var dados = resposta[0][0];

                totCorinthians = dados.qtdCorinthianos;
                totFlamenguistas = dados.qtdFlamenguistas;
                totSantos = dados.qtdSantistas;
                totSaoPaulo = dados.qtdSaoPaulinos;
                totPalmeiras = dados.qtdPalmeirenses;

                totCorinthiansUser = dados.qtdCorinthianosUser;
                totFlamenguistasUser = dados.qtdFlamenguistasUser;
                totSantosUser = dados.qtdSantistasUser;
                totSaoPauloUser = dados.qtdSaoPaulinosUser;
                totPalmeirasUser = dados.qtdPalmeirensesUser;

                totLikes = dados.qtdTotalDeLikes;
                TotComents = dados.qtdTotalDeComents;
                totPosts = dados.qtdTotalDePosts;

                likesCorinthians = dados.likesCorinthians;
                LikesFlamengo = dados.likesFlamengo;
                likesPalmeiras = dados.likesPalmeiras;
                likesSantos = dados.likesSantos;
                likesSaoPaulo = dados.likesSaoPaulo;

                comentsCorinthians = dados.comentsCorinthians;
                comentsFlamengo = dados.comentsFlamengo;
                comentsPalmeiras = dados.comentsPalmeiras;
                comentsSantos = dados.comentsSantos;
                comentsSaoPaulo = dados.comentsSaoPaulo;

                var somaInteracoes = (totCorinthiansUser + likesCorinthians + comentsCorinthians) + (totFlamenguistasUser + LikesFlamengo + comentsFlamengo) + (totPalmeirasUser + likesPalmeiras + comentsPalmeiras) + (totSantosUser + likesSantos + comentsSantos) + (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);

                if (timeUser == "Corinthians") {
                    var somaInteracoesOutros = (totFlamenguistasUser + LikesFlamengo + comentsFlamengo) + (totPalmeirasUser + likesPalmeiras + comentsPalmeiras) + (totSantosUser + likesSantos + comentsSantos) + (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);
                    var somaInteracoesSeu = (totCorinthiansUser + likesCorinthians + comentsCorinthians);

                }

                if (timeUser == "Flamengo") {
                    var somaInteracoesOutros = (totCorinthiansUser + likesCorinthians + comentsCorinthians) + (totPalmeirasUser + likesPalmeiras + comentsPalmeiras) + (totSantosUser + likesSantos + comentsSantos) + (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);
                    var somaInteracoesSeu = (totFlamenguistasUser + LikesFlamengo + comentsFlamengo);

                }

                if (timeUser == "Palmeiras") {
                    var somaInteracoesOutros = (totCorinthiansUser + likesCorinthians + comentsCorinthians) + (totFlamenguistasUser + LikesFlamengo + comentsFlamengo) + (totSantosUser + likesSantos + comentsSantos) + (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);
                    var somaInteracoesSeu = (totPalmeirasUser + likesPalmeiras + comentsPalmeiras);

                }

                if (timeUser == "Santos") {
                    var somaInteracoesOutros = (totCorinthiansUser + likesCorinthians + comentsCorinthians) + (totFlamenguistasUser + LikesFlamengo + comentsFlamengo) + (totPalmeirasUser + likesPalmeiras + comentsPalmeiras) + (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);

                    var somaInteracoesSeu = (totSantosUser + likesSantos + comentsSantos);
                }

                if (timeUser == "São-Paulo") {
                    var somaInteracoesOutros = (totCorinthiansUser + likesCorinthians + comentsCorinthians) + (totFlamenguistasUser + LikesFlamengo + comentsFlamengo) + (totPalmeirasUser + likesPalmeiras + comentsPalmeiras) + (totSantosUser + likesSantos + comentsSantos);

                    var somaInteracoesSeu = (totSaoPauloUser + likesSaoPaulo + comentsSaoPaulo);
                }

                atualizarDados(somaInteracoes, somaInteracoesOutros, somaInteracoesSeu);

            })
        }
    })
}

//Tabelas  do dashboard
function atualizarDados(somaInteracoes, somaInteracoesOutros, somaInteracoesSeu) {
    var imparcialidade = somaInteracoesOutros * 100 / somaInteracoes;
    var fanatismo = somaInteracoesSeu * 100 / somaInteracoes;
    var desempenho = somaInteracoes * 0.70 + somaInteracoesOutros;

    const ctx = document.getElementById('myChart');
    Chart.defaults.color = '#fff';
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Quantidade de usuários de acordo com o time'],
            datasets: [{
                label: 'corinthians',
                data: [totCorinthians],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'black'
            },
            {
                label: 'Flamengo',
                data: [totFlamenguistas],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'red'
            },
            {
                label: 'Santos',
                data: [totSantos],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'white'
            },
            {
                label: 'São-Paulo',
                data: [totSaoPaulo],
                borderWidth: 2,
                borderColor: 'red',
                backgroundColor: 'white'
            },
            {
                label: 'Palmeiras',
                data: [totPalmeiras],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'green'
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    label: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 30
                        }
                    }
                }
            }
        }
    });

    const ctx1 = document.getElementById('myChart1');
    Chart.defaults.color = '#fff';
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Quantidade de seguidores de acordo com o time'],
            datasets: [{
                label: 'corinthians',
                data: [totCorinthiansUser],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'black'
            },
            {
                label: 'Flamengo',
                data: [totFlamenguistasUser],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'red'
            },
            {
                label: 'Santos',
                data: [totSantosUser],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'white'
            },
            {
                label: 'São-Paulo',
                data: [totSaoPauloUser],
                borderWidth: 2,
                borderColor: 'red',
                backgroundColor: 'white'
            },
            {
                label: 'Palmeiras',
                data: [totPalmeirasUser],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'green'
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    label: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 30
                        }
                    }
                }
            }
        }
    });

    const ctx2 = document.getElementById('myChart2');
    Chart.defaults.color = '#fff';
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Métricas dos seus posts'],
            datasets: [{
                label: 'Likes',
                data: [totLikes],
                borderWidth: 2,
                backgroundColor: 'white'
            },
            {
                label: 'Comentários',
                data: [TotComents],
                borderWidth: 2,
                backgroundColor: '#9340FF'
            },
            {
                label: 'Posts',
                data: [totPosts],
                borderWidth: 2,
                backgroundColor: '#FF3C5F'
            },
            {
                label: 'Desempenho',
                data: [desempenho],
                borderWidth: 2,
                backgroundColor: '#5cff33'
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    label: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 30
                        }
                    }
                }
            }
        }
    });


    const ctx3 = document.getElementById('myChart3');
    Chart.defaults.color = '#fff';
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Personalidade da conta'],
            datasets: [{
                label: 'Imparcial',
                data: [imparcialidade],
                borderWidth: 2,
                backgroundColor: '#FF3C5F'
            },
            {
                label: 'Fanática',
                data: [fanatismo],
                borderWidth: 2,
                backgroundColor: '#9340FF'
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    label: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 30
                        }
                    }
                }
            }
        }
    });
}
