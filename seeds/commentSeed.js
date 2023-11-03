const mongoose = require('mongoose');
const comment = require('../models/comment');

require('../models/db');

const newDate = new Date();

const commentSeeds = [
    {
		date: newDate.toLocaleDateString,
        time: newDate.toLocaleTimeString,
		commentTitle: 'Rock On!',
		comment: 'Congratulations, I hope it is everything you wanted!',
		registeredGuest: '65451d80065b55a27e38b49d'
	},
	{
		date: newDate.toLocaleDateString,
        time: newDate.toLocaleTimeString,
		commentTitle: 'Peace to All!',
		comment: 'The invasion is nye!',
		registeredGuest: '65451d80065b55a27e38b49a'
	},
	{
		date: newDate.toLocaleDateString,
        time: newDate.toLocaleTimeString,
		commentTitle: 'Shaken not stirred',
		comment: 'Is it dry in here or is it my Martini..',
		registeredGuest: '65451d80065b55a27e38b49f'
	}
]

const commentDb = async () => {
	for(let seed of commentSeeds) {
		const c = new comment(seed);
		console.log(c);
		await c.save();
	}
}

commentDb().then(() => {
	mongoose.connection.close();
})
.catch((err) => {
	console.log(err);
});