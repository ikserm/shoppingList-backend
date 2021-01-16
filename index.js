const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./src/articles');

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shoppinglist'
});

connect.connect();

const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(events(connect));

app.listen(port, () => {
    console.log('Server stared, port: ' + port);
});