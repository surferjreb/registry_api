const mongoose = require('mongoose');
const guest = require('../models/guest');

require('../models/db');


const newDate = new Date();


const guestSeeds = [
	{
		date: newDate.toLocaleDateString(),
		time: newDate.toLocaleTimeString(),
		firstName: "Bilbo",
		lastName: "Baggins",
		email: "bbaggin@gmail.com",
		comment: {
			title: "You Rock",
			message: "Stay classy"
		}
	},
	{
		date: newDate.toLocaleDateString(),
		time: newDate.toLocaleTimeString(),
		firstName: "Jimmy",
		lastName: "Page",
		email: "WailingWall@gmail.com"
	},
	{
		date: newDate.toLocaleDateString(),
		time: newDate.toLocaleTimeString(),
		firstName: "Roger",
		lastName: "Moore",
		email: "SkMartOnly@gmail.com",
		comment: {
			title: "You know",
			message: "We will always have the islands!"
		}
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

