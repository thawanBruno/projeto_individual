const database = require("../database/conn.js");

function listar(id) {
    var instrucao = `SELECT u.nome, p.idPost, p.legenda, p.imgPost, u.imgPerfil FROM posts as p join usuario as u on p.fkUser = u.idUser where p.fkUser = ${id} GROUP BY p.idPost order by p.idPost DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarLikes(id) {
    var instrucao = `
    SELECT l.fkPost, l.fkUser from likes as l join posts as p on l.fkPost = p.idPost where l.fkUser = ${id} and p.fkUser = ${id};
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

module.exports = { listar, listarLikes, listandoQtdLikes, listandoQtdComents }