var express = require("express");
var router = express.Router();
const upload = require('../config/upload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
const feedController = require('../controllers/feedController.js');


router.get("/", function (req, res) {
    res.render("feed");
});

router.post('/publicar', upload.single('imgPost'), (req, res) => {
    feedController.salvar(req, res);
  });

router.get('/listar', function (req, res){
  feedController.listar(req, res);
});

router.post('/listarLike', (req, res) => {
  feedController.listarLikes(req, res);
});

router.post('/tirarlike', (req, res) =>{
  feedController.dandoLike(req, res);
})

router.post('/darlike', (req, res) =>{
  feedController.dando1Like(req, res);
})

router.post('/abrirComentario', (req, res) =>{
  feedController.listandoComentarios(req, res);
})

router.post('/enviarComentario', (req, res) =>{
  feedController.enviandoComentario(req, res);
})


router.get('/listarQtdLike', (req, res) =>{
  feedController.listandoQtdLikes(req, res);
})

router.get('/listarQtdComent', (req, res) =>{
  feedController.listandoQtdComent(req, res);
})

module.exports = router;
