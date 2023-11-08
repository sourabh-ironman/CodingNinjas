const express = require('express');
const port = 8000;
const app = express();
const path = require('path');

const db = require('./config/mongoose');

//configuring the assets
app.use(express.static('assets'));

//configuring the ejs files to be accessible from views folder
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

//for handling post requests. urlencoded() will put the input values into the body tag
app.use(express.urlencoded());

//any request will be diverted to the routes folder
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('error running the server');
        return;
    }
    console.log('connected to port :',port);
})