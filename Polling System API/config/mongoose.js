const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/polling_system_db');

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'error connecting to DB'));

db.once('open', function(){
    console.log('successfully connected to database');
})