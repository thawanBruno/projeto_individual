const database = require("../database/conn.js");

function salvar(usuario) {
  var instrucao = `INSERT INTO posts (legenda, imgPost, fkUser) VALUES ('${usuario.legenda}', '${usuario.imagem}', ${Number(usuario.id)})`;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listar() {

    var instrucao = `SELECT u.nome, p.idPost, p.legenda, p.imgPost FROM posts as p join usuario as u on p.fkUser = u.idUser GROUP BY p.idPost;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarLikes(id) {
    var instrucao = `
    SELECT fkPost, fkUser from likes where fkUser = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dandoLike(post, id) {
  var instrucao = `
  delete from likes where fkUser = ${id} and fkPost = ${post}
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function dando1Like(post, id) {
  var instrucao = `
  insert into likes values (${id}, ${post});
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listandoComentarios(idPost) {
  var instrucao = `
    select u.nome, c.fkPost, c.fkUser, c.comentario as coment from comentarios as c join usuario as u on c.fkUser = u.idUser where c.fkPost = ${idPost};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listandoQtdLikes(){
  var instrucao = `
    select count(fkPost) as qtdLikes, fkPost from likes GROUP BY fkPost;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listandoQtdComent(){
  var instrucao = `
    select count(fkPost) as qtdComent, fkPost from comentarios GROUP BY fkPost;
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function enviandoComentario(idUser, comentario, fkPost){
  var instrucao = `
    insert into comentarios (fkUser, fkPost, comentario) values (${idUser}, ${fkPost},'${comentario}')
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = { salvar, listar, listarLikes, dandoLike, dando1Like, listandoComentarios, listandoQtdLikes, listandoQtdComent, enviandoComentario }

