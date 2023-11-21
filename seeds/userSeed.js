const mongoose = require('mongoose');
const user = require('../app_api/models/user');

require('../app_api/models/db');


const userSeeds = [
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

const userDB = async () => {
	for(let seed of userSeeds) {
		const u = new user.register(seed, seed.firstName);
		console.log(u);
		await u.save();
	}
}

userDB().then(() => {
	console.log('Success!');
    mongoose.connection.close();
}).catch((err) => {
	console.log(err);
});

