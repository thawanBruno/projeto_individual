var database = require("../database/conn.js");

function cadastrar(nome, email, senha, dtNasc, time){
    if(time == "Santos") var caminho = "santos_novo.png";
    if(time == "São-Paulo") var caminho = "sao_paulo_novo.png";
    if(time == "Palmeiras") var caminho = "palmeiras_novo.png";
    if(time == "Corinthians") var caminho = "corinthians_novo.png";
    if(time == "Flamengo") var caminho = "flamengo_novo.png";
    var instrucao = `CALL cadastrarUsuario('${nome}', '${email}', '${senha}', '${dtNasc}', '${time}', '${caminho}')`;

    return database.executar(instrucao);
}

function autenticar(email, senha){
    var instrucao = `
        select * from usuario where email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = { cadastrar, autenticar }