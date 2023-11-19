const database = require("../database/conn.js");

function listar(id) {
    var instrucao = `SELECT u.nome, p.idPost, p.legenda, p.imgPost, u.imgPerfil FROM posts as p join usuario as u on p.fkUser = u.idUser where p.fkUser = ${id} GROUP BY p.idPost order by p.idPost DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function informacoes(id) {
    var instrucao = `select nome, imgPerfil from usuario where idUser = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function seguidores(id) {
    var instrucao = `select count(fkSeguidor) as qtdSeguidores from userseguidor where fkUser = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function seguindo(id) {
    var instrucao = `select count(fkUser) as qtdSeguindo from userseguidor where fkSeguidor = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificar(seg, user) {
    var instrucao = `select count(fkUser) as verificacao from userseguidor where fkUser = ${seg} and fkSeguidor = ${user}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function seguir(seg, user) {
    var instrucao = `insert into userseguidor (fkUser, fkSeguidor) values (${seg}, ${user})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deixarSeguir(seg, user) {
    var instrucao = `delete from userseguidor where fkUser = ${seg} and fkSeguidor = ${user}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { listar, informacoes, seguidores, seguindo, verificar, seguir, deixarSeguir }