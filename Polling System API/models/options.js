const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    votes:{
        type: Number,
        required: true
    },
    linkToVote:{
        type: String,
        required: true
    },
    question:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questions',
        required: true
    }
})

const Option = mongoose.model('Option',optionSchema);
module.exports = Option;