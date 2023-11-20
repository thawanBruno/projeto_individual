const database = require("../database/conn.js");

function obterDados (id){
    
    var instrucao = `CALL dadosDashboard(${id})`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = { obterDados }