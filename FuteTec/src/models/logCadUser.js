var database = require("../database/conn.js");

function cadastrar(nome, email, senha, dtNasc, time){
    console.log('f1');
    var instrucao = `INSERT INTO usuario (nome, email, senha, dtNasc, timeUser) VALUES ('${nome}', '${email}', '${senha}', '${dtNasc}', '${time}')`;

    return database.executar(instrucao);
}

module.exports = { cadastrar }