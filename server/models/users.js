const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true
    },
    isRead: {
        type: Boolean,
        default: false
    },
    sentByMe: {
        type: Boolean,
        default: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
},{ capped: {size: 100}}    );

const MessageGroup = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    messages : [ MessageSchema ]
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, "invalid email"],
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    publicKey: {
        type: String,
        required: true,
        trim: true
    },
    privateKey: {
        type: String,
        required: true,
        trim: true
    },
    messages: [ MessageGroup ] ,
    registeredOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);