const mysql = require("mysql2");

var mySqlConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'futetec'
});

mySqlConfig.connect(function (err) {
    console.log("Conexão com o banco de dados realizado com sucesso!");
});

function executar(instrucao) {
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        return new Promise(function (resolve, reject) {
            var conexao = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'futetec'
            })
            conexao.connect();
            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    reject(erro);
                }
                console.log(resultados);
                resolve(resultados);
            });
            conexao.on('error', function (erro) {
                return ("ERRO NO MySQL WORKBENCH: ", erro.sqlMessage);
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
            reject("AMBIENTE NÃO CONFIGURADO EM app.js")
        });
    }
}

module.exports = {
    executar
}


// conn.query("SELECT * FROM usuario", function (err, rows, fields) {
//     if (!err) {
//         console.log("Resultado:", rows);
//     } else {
//         console.log("erro: Consulta não realizada com sucesso!");
//     }
// });
