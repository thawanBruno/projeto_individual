const database = require("../database/conn.js");

function listar(id) {
    var instrucao = `SELECT u.nome, p.idPost, p.legenda, p.imgPost FROM posts as p join usuario as u on p.fkUser = u.idUser where p.fkUser = ${id} GROUP BY p.idPost order by p.idPost DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { listar }