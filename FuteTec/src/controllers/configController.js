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

module.exports = { redefinir }