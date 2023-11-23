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

function listarLikes(id, seguidor) {
    var instrucao = `
    SELECT l.fkPost, l.fkUser from likes as l join posts as p on l.fkPost = p.idPost where l.fkUser = ${id} and p.fkUser = ${seguidor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listandoQtdLikes(seguidor){
    var instrucao = `
    select count(l.fkPost) as qtdLikes, l.fkPost from likes as l join posts as p on l.fkPost = p.idPost where p.fkUser = ${seguidor} GROUP BY l.fkPost;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listandoQtdComents(seguidor){
    var instrucao = `
    select count(c.fkPost) as qtdComents, c.fkPost from comentarios as c join posts as p on c.fkPost = p.idPost where p.fkUser = ${seguidor} GROUP BY fkPost;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { listar, informacoes, seguidores, seguindo, verificar, seguir, deixarSeguir, listarLikes, listandoQtdLikes, listandoQtdComents }