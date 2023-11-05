var database = require("../database/conn.js");

function cadastrar(nome, email, senha, dtNasc, time){
    var instrucao = `insert into usuario (nome, email, senha, dtNasc, time) values (${nome}, ${email}, ${senha}, ${dtNasc}, ${time})`;

    return database.executar(instrucao);
}

module.exports = { cadastrar }