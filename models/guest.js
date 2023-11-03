const mongoose = require('mongoose');
const { Schema } = mongoose();

const guestSchema = new Schema({
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
		type: email,
        required: true
	}
});

const guest = mongoose.model('guest', guestSchema );

module.exports = guest;
