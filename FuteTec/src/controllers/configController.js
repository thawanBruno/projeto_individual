var configModels = require("../models/configModels.js")

function redefinir(req, res) {
    const imagem = req.file.filename;

    const {id, nome, email, senha, dtNasc, time } = req.body

    const usuario = {id, nome, email, senha, dtNasc, time, imagem}

    configModels.redefinir(usuario)
        .then(resultado => {
            res.json({
                imgPerfil: usuario.imagem
            })
            res.status(201).send("Dados redefinidos com sucesso!!");
            console.log(resultado)
        }).catch(err => {
            res.status(500).send(err);
        });
}

function deletar(req, res) {
    console.log("f2");
    var id = req.params.id;

    configModels.deletar(id)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = { redefinir, deletar }