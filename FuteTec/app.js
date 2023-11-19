process.env.AMBIENTE_PROCESSO = "desenvolvimento";

const express =  require("express");
var cors = require("cors");
var path = require("path");
const app = express();

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.set("views", (path.join(__dirname, "/public")));


var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3000 : 8080;

app.use(cors());

var indexRoute = require("./src/routes/index");
var feedRoute = require("./src/routes/feed");
var perfilRoute = require("./src/routes/perfil");
var seguidorRoute = require("./src/routes/seguidor");
var configuracaoRoute = require("./src/routes/configuracao");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));


app.use("/index", indexRoute);
app.use("/feed", feedRoute);
app.use("/perfil", perfilRoute);
app.use("/Seguidor", seguidorRoute);
app.use("/configuracao", configuracaoRoute);

app.listen(PORTA, () => {
    console.log(`Servidor rodando em : http://localhost:${PORTA}`);
});
