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
    }
});

userSchema.plugin(passportLocalMongoose);

const user = mongoose.model('user', userSchema);

module.exports = user;