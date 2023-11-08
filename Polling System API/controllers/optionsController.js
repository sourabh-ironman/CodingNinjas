const Option = require('../models/options');
const Question = require('../models/questions');

module.exports.delete = function(req, res){
    Option.findById(req.params.id)
    .then(function(optionData){
        let questionId = optionData.question;
        Question.findById(questionId)
        .then(function(questionData){
            let optionsArray = questionData.options;
            let optionIndex = optionsArray.indexOf(req.params.id);
            optionsArray.splice(optionIndex, 1);
            questionData.save();
        })
        .then(function(){
            Option.deleteOne({_id:req.params.id})
            .then(function(){
                console.log('option has been deleted');
                res.end('option deleted!');
            }).catch(function(err){
                console.log('error deleting the option');
                res.end('error deleting the option')
            })
        })
    })
}

module.exports.addVote = function(req, res){
    Option.findById(req.params.id).then(function(data){
        data.votes += 1;
        data.save();
        res.end('upvoted!');       
    }).catch(function(error){
        console.log('error updating vote ',error);
    })
}