const mongoose = require('mongoose');

const QueryAttemptSchema = new mongoose.Schema({
    assignmentId: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('QueryAttempt', QueryAttemptSchema);
