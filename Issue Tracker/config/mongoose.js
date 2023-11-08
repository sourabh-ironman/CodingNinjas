const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/issue_tracker_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})