const mongoose = require('mongoose');
const guest = require('../models/guest');

require('../models/db');


const guestSeeds = [
	{
		_id: '65451d80065b55a27e38b49a',
		firstName: "Bilbo",
		lastName: "Baggins",
		email: "bbaggin@gmail.com",
	},
	{
		_id: '65451d80065b55a27e38b49d',
		firstName: "Jimmy",
		lastName: "Page",
		email: "WailingWall@gmail.com"
	},
	{
		_id: '65451d80065b55a27e38b49f',
		firstName: "Roger",
		lastName: "Moore",
		email: "SkMartOnly@gmail.com",
	},
]

const guestDB = async () => {
	for(let seed of guestSeeds) {
		const g = new guest(seed);
		console.log(g);
		await g.save();
	}
}

guestDB().then(() => {
    mongoose.connection.close();
});

