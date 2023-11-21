const mongoose = require('mongoose');
const comment = require('../models/comment');

require('../models/db');

const commentSeeds = [
    {
		title: 'Rock On!',
		comment: 'Congratulations, I hope it is everything you wanted!',
		guest: '65451d80065b55a27e38b49d'
	},
	{
		title: 'Peace to All!',
		comment: 'The invasion is nye!',
		guest: '65451d80065b55a27e38b49a'
	},
	{
		title: 'Shaken not stirred',
		comment: 'Is it dry in here or is it my Martini..',
		guest: '65451d80065b55a27e38b49f'
	},
	{
		title: 'Davey be proud!',
		comment: 'tis not a dry eye nor cup laddies!',
		guest: '654563d58af01337b10b56df'
	},
	{
		title: 'Come on Down',
		comment: 'You got a good spin!',
		guest: '654564388af01337b10b56e0'
	},
	{
		title: 'Shaken not stirred',
		comment: 'Is it dry in here or is it my Martini..',
		guest: '65451d80065b55a27e38b49f'
	}
]

const commentDb = async () => {
	for(let seed of commentSeeds) {
		const newDate = new Date();

		const c = new comment({
			date: newDate.toLocaleDateString(),
			time: newDate.toLocaleTimeString(),
            title: seed.title,
            comment: seed.comment,
            guest: seed.guest
		});

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
