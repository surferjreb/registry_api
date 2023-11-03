const mongoose = require('mongoose');
const { Schema } = mongoose();
const guest = require('./guest');

const commentSchema = new Schema({
	date: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		default: "Congratulations!"
	},
	registeredGuest: {
		type: ObjectId(),
		ref: guest,
		required: true
	}
})

const comment = mongoose.models('comment', commentSchema);

module.exports = comment;
