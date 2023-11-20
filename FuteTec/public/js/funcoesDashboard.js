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
                atualizarDados();

            })
        }
    })
}

//Tabelas  do dashboard
function atualizarDados() {
    const ctx = document.getElementById('myChart');
    Chart.defaults.color = '#fff';
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Evento  FuteTec'],
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
                            size: 20
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
                            size: 20
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
                label: 'corinthians',
                data: ['14'],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'black'
            },
            {
                label: 'Flamengo',
                data: ['13'],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'red'
            },
            {
                label: 'Santos',
                data: ['15'],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'white'
            },
            {
                label: 'São-Paulo',
                data: ['14'],
                borderWidth: 2,
                borderColor: 'red',
                backgroundColor: 'white'
            },
            {
                label: 'Palmeiras',
                data: ['14'],
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
                            size: 20
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
            labels: ['Evento  FuteTec'],
            datasets: [{
                label: 'corinthians',
                data: ['14'],
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: 'black'
            },
            {
                label: 'Flamengo',
                data: ['13'],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'red'
            },
            {
                label: 'Santos',
                data: ['15'],
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'white'
            },
            {
                label: 'São-Paulo',
                data: ['14'],
                borderWidth: 2,
                borderColor: 'red',
                backgroundColor: 'white'
            },
            {
                label: 'Palmeiras',
                data: ['14'],
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
                            size: 20
                        }
                    }
                }
            }
        }
    });
}
