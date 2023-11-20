var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/", function (req, res) {
    res.render("dashboard");
});

router.post("/obterDados", function (req, res) {
    dashboardController.obterDados(req, res);
});

module.exports = router;
