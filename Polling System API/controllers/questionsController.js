const Question = require('../models/questions');
const Option = require('../models/options');

module.exports.create = function(req, res){
    // console.log('req.body is ',req.body);
    Question.create({
        title: req.body.title
    }).then(function(data){
        console.log('data created successfully ',data);
        res.end('');
    }).catch(function(err){
        console.log('error in creating data ',err);
        res.end('');
    })
}

module.exports.createOption = function(req, res){
    // console.log('req.params ',req.params);
    // console.log('req.body ',req.body);
    let votes = 0;
    let linkToVote = "http://localhost:8000/options"
    let question;
    Question.findById(req.params.id).then(function(quesData){
        question = quesData;
        // console.log('question ',question);
        // console.log('req.params._id ',req.params.id);
    })
    Option.create({
        text: req.body.text,
        votes: votes,
        linkToVote: linkToVote,
        question: req.params.id
    }).then(function(data){
        console.log('created option is ',data);
        Option.findByIdAndUpdate(data._id,{
            linkToVote: linkToVote+'/'+data._id+'/add_vote'
        }).then(function(){
            question.options.push(data);
            question.save();
            console.log('question.options after push ',question.options);
            // console.log('link to vote updated ');
            res.end('link to vote updated');
        })
    }).catch(function(err){
        console.log('error creating options for a question');
        res.end('error creating options for a question');
    })
    
}

module.exports.delete = function(req, res){
    // console.log('req.params ',req.params);
    Option.deleteMany({question:req.params.id}).then(function(){
        console.log('options related to the question deleted!');
    })
    .then(function(){
        Question.findByIdAndDelete(req.params.id)
        .then(function(){
            console.log('deletion successful');
            res.end('deleting..');
        }).catch(function(err){
            console.log('error deleting question');
            res.end('error deleting..');
        })
    })
}

module.exports.view = function(req, res){
    Question.findById(req.params.id)
    .populate({
        path: 'options'
    })
    .then(function(data){
        res.send(data);
    }).catch(function(err){
        console.log('error in viewing questions ',err);
        res.end('error in viewing questions ');
    })
}