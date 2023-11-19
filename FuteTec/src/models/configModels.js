const database = require("../database/conn.js");

function redefinir (usuario){
    console.log('f1');
    var instrucao = `UPDATE usuario SET nome = '${usuario.nome}', email = '${usuario.email}', senha = '${usuario.senha}', dtNasc = '${usuario.dtNasc}', timeUser = '${usuario.time}', imgPerfil = '${usuario.imagem}' where idUser = ${usuario.id};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id) {
    var instrucao = `
        DELETE FROM usuario WHERE idUser = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {redefinir, deletar}