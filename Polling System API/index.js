const express = require('express');
const port = 8000;
const app = express();

const db = require('./config/mongoose');

app.use(express.urlencoded());
app.use('/',require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('error connecting to express ',err);
        return;
    }
        console.log('listening to port ',port);
    
})

