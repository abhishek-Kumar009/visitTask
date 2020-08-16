const mysql = require('mysql');
//Create a connection to mySql
var mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "userSteps",
    multipleStatements: true
});
mySqlConnection.connect(error => {
    if (!error) {
        console.log("Connected");
    } else {
        console.log("Failed to connect to mysql database!");
    }
});

module.exports = mySqlConnection;