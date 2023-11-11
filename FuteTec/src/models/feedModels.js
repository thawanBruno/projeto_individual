const database = require("../database/conn.js");

function salvar(usuario) {
  console.log(`${usuario.legenda}', '${usuario.imagem}', ${Number(usuario.id)}`)
  const instrucao = `INSERT INTO posts (legenda, imgPost, fkUser) VALUES ('${usuario.legenda}', '${usuario.imagem}', ${Number(usuario.id)})`;

  return database.executar(instrucao);
}

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `SELECT u.nome, p.legenda, p.imgPost FROM posts as p join usuario as u on p.fkUser = u.idUser`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = { salvar, listar }

