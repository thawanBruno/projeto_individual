const usuarioModel = require('../models/feedModels.js');

function salvar(req, res) {
    const imagem = req.file.filename;

    const { legenda, id } = req.body

    const usuario = { legenda, imagem, id }

    usuarioModel.salvar(usuario)
        .then(resultado => {
            res.status(201).send("Post criado com sucesso");
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

module.exports = { salvar, listar }
