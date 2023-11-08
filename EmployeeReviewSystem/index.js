const express = require('express');
// const http = require('http');
const port = 8000;
const fs = require('fs');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose');
const Employee = require('./models/employee');

// console.log('current directory ',__dirname);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('assets'));

app.use(express.urlencoded());
app.use(cookieParser());

app.use('/', require('./routes/index'));



app.listen(port, function(err){
    if(err){
        console.log('error connecting to server ',err);
        return;
    }

    console.log('server running on port: ',port);
});
