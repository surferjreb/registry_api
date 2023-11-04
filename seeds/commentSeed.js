const mongoose = require('mongoose');
const comment = require('../models/comment');

require('../models/db');

const newDate = new Date();

const commentSeeds = [
    {
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
		commentTitle: 'Rock On!',
		comment: 'Congratulations, I hope it is everything you wanted!',
		registeredGuest: '65451d80065b55a27e38b49d'
	},
	{
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
		commentTitle: 'Peace to All!',
		comment: 'The invasion is nye!',
		registeredGuest: '65451d80065b55a27e38b49a'
	},
	{
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
		commentTitle: 'Shaken not stirred',
		comment: 'Is it dry in here or is it my Martini..',
		registeredGuest: '65451d80065b55a27e38b49f'
	},
	{
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
		commentTitle: 'Davey be proud!',
		comment: 'tis not a dry eye nor cup laddies!',
		registeredGuest: '654563d58af01337b10b56df'
	},
	{
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
		commentTitle: 'Come on Down',
		comment: 'You got a good spin!',
		registeredGuest: '654564388af01337b10b56e0'
	},
	{
		date: newDate.toLocaleDateString(),
        time: newDate.toLocaleTimeString(),
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