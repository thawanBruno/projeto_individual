const usuarioModel = require('../models/feedModels.js');

function salvar(req, res) {
    const imagem = req.file.filename;

    const { legenda, id } = req.body

    const usuario = { legenda, imagem, id }

    usuarioModel.salvar(usuario)
        .then(resultado => {
            res.status(201).send("Post criado com sucesso");
            console.log(resultado)
        }).catch(err => {
            res.status(500).send(err);
        });
}

function listar(req, res) {
    usuarioModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarLikes(req, res) {
    var id = req.body.idserver;

    usuarioModel.listarLikes(id)
        .then(function (likes) {
            if (likes.length > 0) {
                res.status(200).json(likes);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(err => {
            res.status(500).send(err);
        });
}

function dandoLike(req, res) {
    var post = req.body.fkPostServer
    var id = req.body.fkUserServer;

    usuarioModel.dandoLike(post, id)
        .then(function (resposta) {
            if (resposta.length > 0) {
                res.status(200).json(resposta);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(err => {
            res.status(500).send(err);
        });
}

function dando1Like(req, res) {
    var post = req.body.fkPostServer;
    var id = req.body.fkUserServer;

    usuarioModel.dando1Like(post, id)
        .then(function (resposta) {
            if (resposta.length > 0) {
                res.status(200).json(resposta);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(err => {
            res.status(500).send(err);
        });
}

function listandoComentarios(req, res) {
    idPost = req.body.fkPostServer;

    usuarioModel.listandoComentarios(idPost).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listandoQtdLikes(req, res) {
    usuarioModel.listandoQtdLikes().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listandoQtdComent(req, res) {
    usuarioModel.listandoQtdComent().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function enviandoComentario(req, res) {
    idUser = req.body.idServer;
    comentario = req.body.comentarioServer;
    fkPost = req.body.postServer;

    usuarioModel.enviandoComentario(idUser, comentario, fkPost).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = { salvar, listar, listarLikes, dandoLike, dando1Like, listandoComentarios, listandoQtdLikes, listandoQtdComent, enviandoComentario }
