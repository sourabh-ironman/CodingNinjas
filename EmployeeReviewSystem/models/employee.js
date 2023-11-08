const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    performance_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PerformanceReview'
        }
    ]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;