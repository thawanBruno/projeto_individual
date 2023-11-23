const seguidorModel = require('../models/seguidorModels.js');


function listar(req, res) {
    var id = req.body.idserver;

    seguidorModel.listar(id).then(function (resultado) {
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

function informacoes(req, res) {
    var id = req.body.idserver;

    seguidorModel.informacoes(id).then(function (resultado) {
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

function seguidores(req, res) {
    var id = req.body.idserver;

    seguidorModel.seguidores(id).then(function (resultado) {
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

function seguindo(req, res) {
    var id = req.body.idserver;

    seguidorModel.seguindo(id).then(function (resultado) {
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

function verificar(req, res) {
    var seg = req.body.idSeg;
    var user = req.body.idUser;

    seguidorModel.verificar(seg, user).then(function (resultado) {
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

function seguir(req, res) {
    var seg = req.body.idSeg;
    var user = req.body.idUser;

    seguidorModel.seguir(seg, user).then(function (resultado) {
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

function deixarSeguir(req, res) {
    var seg = req.body.idSeg;
    var user = req.body.idUser;

    seguidorModel.deixarSeguir(seg, user).then(function (resultado) {
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
    var seguidor = req.body.seguidor;

    seguidorModel.listarLikes(id, seguidor)
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
    var seguidor = req.body.fkUser

    seguidorModel.listandoQtdLikes(seguidor).then(function (likes) {
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
    var seguidor = req.body.fkUser

    seguidorModel.listandoQtdComents(seguidor).then(function (likes) {
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

module.exports = { listar, informacoes, seguidores, seguindo, verificar, seguir, deixarSeguir, listarLikes, listandoQtdLikes, listandoQtdComents }
