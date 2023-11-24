const database = require("../database/conn.js");

function redefinir (usuario){

    var instrucao = `UPDATE usuario SET nome = '${usuario.nome}', email = '${usuario.email}', senha = '${usuario.senha}', dtNasc = '${usuario.dtNasc}', timeUser = '${usuario.time}', imgPerfil = '${usuario.imagem}' where idUser = ${usuario.id};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function redefinir2 (nome, email, senha, dtNasc, time, id){

    var instrucao = `UPDATE usuario SET nome = '${nome}', email = '${email}', senha = '${senha}', dtNasc = '${dtNasc}', timeUser = '${time}' where idUser = ${id};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id) {
    var instrucao = `
        CALL deletarUsuario(${id});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {redefinir, redefinir2, deletar}