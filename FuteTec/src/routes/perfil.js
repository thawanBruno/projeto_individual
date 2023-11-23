var express = require("express");
var router = express.Router();
const perfilController = require('../controllers/perfilController.js');

router.get("/", function (req, res) {
    res.render("perfil");
});

router.post('/listar', function (req, res){
    perfilController.listar(req, res);
  });

  router.post('/listarLike', (req, res) => {
    perfilController.listarLikes(req, res);
  });

router.post('/listarQtdLike', (req, res) =>{
    perfilController.listandoQtdLikes(req, res);
});

router.post('/listarQtdComents', (req, res) =>{
    perfilController.listandoQtdComents(req, res);
});

module.exports = router;
