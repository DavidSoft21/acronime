const mysql = require('mysql');

//config DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: "acronime_db"
});

//Connection
connection.connect((err) => {
    if (err) {
        console.log("ha ocurrido un error en la conexion de la base de datos!: " + err);
    } else {
        console.log("base de datos conectada correctamente!!");
    }
});

//close connection
//connection.end();

//export variable connection
module.exports = connection;

