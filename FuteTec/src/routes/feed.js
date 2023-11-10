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

module.exports = router;
