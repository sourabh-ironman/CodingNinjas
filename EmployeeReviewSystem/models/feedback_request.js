const mongoose = require('mongoose');

const feedbackRequestSchema = new mongoose.Schema({
    isSubmitted: {
        type: Boolean,
        required: true
    },
    requestedBy: {
        type: String,
        required: true
    },
    requestedTo:{
        type: String,
        required: true
    },
    performance_review:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PerformanceReview'
    }
});

const feedbackRequest = mongoose.model('FeedbackRequest',feedbackRequestSchema);
module.exports = feedbackRequest;
