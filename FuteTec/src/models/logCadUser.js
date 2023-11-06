var database = require("../database/conn.js");

function cadastrar(nome, email, senha, dtNasc, time){
    console.log('f1');
    var instrucao = `INSERT INTO usuario (nome, email, senha, dtNasc, timeUser) VALUES ('${nome}', '${email}', '${senha}', '${dtNasc}', '${time}')`;

    return database.executar(instrucao);
}

function autenticar(email, senha){
    var instrucao = `
        select * from usuario where email = '${email}' and senha = '${senha}';
    `;
    return database.executar(instrucao);
}

module.exports = { cadastrar, autenticar }