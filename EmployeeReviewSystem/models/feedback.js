const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    performance_review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PerformanceReview'
    },
    createdBy: {
        type: String,
        required: true
    },
    feedback_Request_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feedbackRequest'
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;