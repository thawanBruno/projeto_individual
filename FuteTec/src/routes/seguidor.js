var express = require("express");
var router = express.Router();
const seguidorController = require('../controllers/seguidorController.js');

router.get("/", function (req, res) {
    res.render("seguidor");
});

router.post('/listar', function (req, res){
    seguidorController.listar(req, res);
});

router.post('/informacoes', function (req, res){
    seguidorController.informacoes(req, res);
});

router.post('/verificar', function (req, res){
    seguidorController.verificar(req, res);
});

router.post('/seguidores', function (req, res){
    seguidorController.seguidores(req, res);
});

router.post('/seguindo', function (req, res){
    seguidorController.seguindo(req, res);
});

router.post("/seguir", function (req, res){
    seguidorController.seguir(req, res);
});

router.post("/dixarSeguir", function (req, res){
    seguidorController.deixarSeguir(req, res);
});

module.exports = router;
