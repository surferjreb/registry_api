const mongoose = require('mongoose');
const { Schema } = mongoose;
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
	title: {
		type: String,
		minLength: 3,
		maxLength: 80,
		required: true
	},
	comment: {
		type: String,
		default: "Congratulations!"
	},
	guest: {
		type: Schema.Types.ObjectId,
		ref: guest,
		required: true
	}
})

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;
