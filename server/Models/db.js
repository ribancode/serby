const mysql = require('mysql2')
const mysqlConn = mysql.createPool({
    // host:'us-cdbr-east-04.cleardb.com',
    // user:'b38001a7000088',
    // password:'bed8b0f8',
    // database:'heroku_044ff46a2bb6da2'
    
    host:'localhost',
    user:'root',
    password:'',
    database:'serby'

    // host:'13.127.32.127',
    // user:'test',
    // password:'Admin@123#@!',
    // port: '3306',
    // database:'test'
})
mysqlConn.getConnection((err) => {
    if(!err){
        console.log('database connected')
    } else{
        console.log(err)
    }
})

module.exports = mysqlConn