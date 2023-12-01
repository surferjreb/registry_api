const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    lastName: {
        type: String,
        minLength: 1,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    madeComment: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        enum: ['user', 'guest'],
        default: 'guest'
    }
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user', userSchema);

module.exports = user;
