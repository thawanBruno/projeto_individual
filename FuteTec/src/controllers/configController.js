var configModels = require("../models/configModels.js")

function redefinir(req, res) {
    console.log('Entrou redefinir');
    const imagem = req.file.filename;

    const {id, nome, email, senha, dtNasc, time } = req.body

    const usuario = {id, nome, email, senha, dtNasc, time, imagem}

    configModels.redefinir(usuario)
        .then(resultado => {
            var imagem = usuario.imagem
            res.json({
                imgPerfil: imagem
            })
        }).catch(err => {
            res.status(500).send(err);
        });
}

function redefinir2(req, res){
    console.log('Entrou redefinir2');

    var nome = req.body. nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;
    var time = req.body.timeServer;
    var id = req.body.idServer;

    configModels.redefinir2(nome, email, senha, dtNasc, time, id)
        .then(resultado => {
            res.status(201).send("Dados redefinidos com sucesso!!");
            console.log(resultado)
        }).catch(err => {
            res.status(500).send(err);
        });
}


function deletar(req, res) {
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

module.exports = { redefinir, redefinir2, deletar }