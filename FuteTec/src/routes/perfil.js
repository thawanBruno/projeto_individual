var express = require("express");
var router = express.Router();
const perfilController = require('../controllers/perfilController.js');

router.get("/", function (req, res) {
    res.render("perfil");
});

router.post('/listar', function (req, res){
    perfilController.listar(req, res);
  });

module.exports = router;
