const perfilModel = require('../models/perfilModels.js');

function listar(req, res) {
    var id = req.body.idserver;

    perfilModel.listar(id).then(function (resultado) {
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

    perfilModel.listarLikes(id)
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

function listandoQtdLikes(req, res) {
    var seguidor = req.body.idserver

    perfilModel.listandoQtdLikes(seguidor).then(function (likes) {
        if (likes.length > 0) {
            res.status(200).json(likes);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listandoQtdComents(req, res) {
    var seguidor = req.body.idserver

    perfilModel.listandoQtdComents(seguidor).then(function (likes) {
        if (likes.length > 0) {
            res.status(200).json(likes);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = { listar, listarLikes, listandoQtdLikes, listandoQtdComents }