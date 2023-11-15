var logCadUser = require("../models/logCadUser.js")

function cadastrar(req, res){
    var nome = req.body. nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var dtNasc = req.body.dtNascServer;
    var time = req.body.timeServer;

    logCadUser.cadastrar(nome, email, senha, dtNasc, time)
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

function autenticar(req, res){
    var emailLogin = req.body.emailLoginServer;
    var senhaLogin  = req.body.senhaLoginServer;

    console.log(emailLogin);
    console.log(senhaLogin);

    logCadUser.autenticar(emailLogin, senhaLogin)
    .then(
        function (resultado){
            if(resultado.length == 1){
                res.json({
                    id: resultado[0].idUser,
                    nome: resultado[0].nome,
                    email: resultado[0].email,
                    senha: resultado[0].senha,
                    dtNasc: resultado[0].dtNasc,
                    timeUser: resultado[0].timeUser,
                    imgPerfil: resultado[0].imgPerfil
                })
            } else if(resultado.length == 0){
                res.status(403).send("Email e/ou senha inválido(s)");
            } else {
                res.status(403).send("Mais de um usuário com o mesmo login e senha!");
            }
        }
    ).catch(
        function(erro){
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a autenticação! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    )
}

module.exports = { cadastrar, autenticar }