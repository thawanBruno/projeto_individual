var express = require("express");
var router = express.Router();

var logCadController = require("../controllers/logCadController.js");

router.get("/index", function (req, res) {
    res.render("index");
});

router.post('/cadastrar', function (req, res) {
    logCadController.cadastrar(req, res);
})

module.exports = router;
