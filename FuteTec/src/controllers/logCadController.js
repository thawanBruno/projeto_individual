var logCadUser = require("../models/logCadUser.js")

function cadastrar(req, res){
    var nome = req.body. nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.NascServer;
    var time = req.body.timeServer;

    usuarioModel.cadastrar(nome, email, senha, dtNasc, time)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = { cadastrar }