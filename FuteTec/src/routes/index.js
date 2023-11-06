var express = require("express");
var router = express.Router();

var logCadController = require("../controllers/logCadController.js");

router.get("/", function (req, res) {
    res.render("index");
});

router.post('/cadastrar', function (req, res) {
    logCadController.cadastrar(req, res);
})

router.post('/login', function (req, res) {
    logCadController.autenticar(req, res);
})


module.exports = router;
