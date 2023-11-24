var express = require("express");
var router = express.Router();
const upload = require('../config/uploadPerfil'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const configController = require('../controllers/configController.js');

router.get("/", function (req, res) {
    res.render("configuracao");
});

router.post("/redefinir", upload.single('imgPerfil'), function (req, res) {
    configController.redefinir(req, res);
})

router.post("/redefinir2", function (req, res) {
    configController.redefinir2(req, res);
})

router.delete("/deletar/:id", function (req, res) {
    configController.deletar(req, res);
});

module.exports = router;
