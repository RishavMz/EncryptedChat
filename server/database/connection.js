require('dotenv').config();
const sql = require('mysql');

const conn = sql.createConnection({
    host:       process.env.DATABASEHOST,
    user:       process.env.DATABASEUSER,
    password:   process.env.DATABASEPASSWORD
});

//conn.connect((error)=>{
//    if(error){
//        throw error;
//    } else {
//        console.log('Successfully connected to MySQL database');
//    }
//});

module.exports = {conn};