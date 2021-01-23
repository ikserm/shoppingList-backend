const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const articles = require('./src/articles');
const bearerToken = require('express-bearer-token');
const oktaAuth = require('./src/auth');



const connect = mysql.createConnection({
    host: 'cis9cbtgerlk68wl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'tajtuarubptehzz1',
    password: 'ra191tac5xgs6a3r',
    database: 'zthi7jhbh4fk4ckz'
});

connect.connect();

const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(bearerToken())
    .use(oktaAuth)
    .use(articles(connect));


app.listen(port, () => {
    console.log('Server stared, port: ' + port);
});