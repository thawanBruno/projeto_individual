const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'futetec'
});

conn.connect( function(err){
console.log("Conexão com o banco de dados realizado com sucesso!");
});

// conn.query("SELECT * FROM usuario", function (err, rows, fields) {
//     if (!err) {
//         console.log("Resultado:", rows);
//     } else {
//         console.log("erro: Consulta não realizada com sucesso!");
//     }
// });
