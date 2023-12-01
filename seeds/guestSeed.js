const mongoose = require('mongoose');
const guest = require('../app_api/models/guest');

require('../app_api/models/db');


const guestSeeds = [
	{

		firstName: "Bilbo",
		lastName: "Baggins",
		email: "bbaggin@gmail.com",
	},
	{

		firstName: "Jimmy",
		lastName: "Page",
		email: "WailingWall@gmail.com"
	},
	{
		firstName: "Roger",
		lastName: "Moore",
		email: "SkMartOnly@gmail.com",
	},
	{
		firstName: 'Billy',
		lastName: 'Bones',
		email: 'blackskabbard69@gmail.com'
	  },
	  {
		firstName: 'Alex',
		lastName: 'Tribeck',
		email: 'onemorespin1d@live.com'
	  },
	  {
		firstName: 'Fedrick',
		lastName: 'Cummings',
		email: 'fcummings9696.com'
	  },
	  {
		firstName: 'Clark',
		lastName: 'Kent',
		email: 'manosteele@gmail.com'
	  },
	  {
		firstName: 'Bruce',
		lastName: 'Willis',
		email: 'realmfcowboy@live.com'
	  },
	  {
		firstName: 'Mandy',
		lastName: 'Moore',
        email: 'Kcandy18@gmail.com'
	  },
	  {
	  	firstName: 'Jimmi',
	  	lastName: 'Hendrix',
	  	email: 'sandcastlemagic@gmail.com',

	  },
	  {
	  	firstName: 'Bob',
	  	lastName: 'Villa',
	  	email: 'goatCarpenter@gmail.com',

	  }

]

const guestDB = async () => {
	for(let seed of guestSeeds) {
		const u = new guest.register(seed, seed.firstName);
		console.log(u);
		await u.save();
	}
}

guestDB().then(() => {
	console.log('Success!');
    mongoose.connection.close();
}).catch((err) => {
	console.log(err);
});

