const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    sender: {
        type: String,
        trim: true,
        required: true
    },
    receiver: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model('Message', MessageSchema);