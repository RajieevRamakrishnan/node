const express = require('express');
const app = express(),
    bodyParser = require("body-parser");
port = 3080;

const date_time = new Date()


const users = [];
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ihouselu_accommodations4u'
});

connection.connect()

app.use(bodyParser.json())

app.post('/api/add-user', (req, res) => {
    connection.query("INSERT INTO `admin_account` (`admin_type`,`name`,`user_name`,`password`,`created`) VALUES ('"+req.body.type+"','"+req.body.name+"','"+req.body.username+"','"+req.body.password+"',"+new Date()+")", (err, rows) => {
        if (err) throw res.json(err);
        else if (!err) res.json(true)
    });
});

app.post('/api/get-user', (req,res)=>{
    connection.query("SELECT * FROM `admin_account`",(err, result, fields) => {
        if (err) throw res.json(err)
        else if (!err) res.json(result)
    })
})

app.listen(port, () => {});

connection.end()