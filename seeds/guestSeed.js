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
	{
		_id: '654563d58af01337b10b56df',
		firstName: 'Billy',
		lastName: 'Bones',
		email: 'blackskabbard69@gmail.com'
	  },
	  {
		_id: '654564388af01337b10b56e0',
		firstName: 'Alex',
		lastName: 'Tribeck',
		email: 'onemorespin1d@live.com'
	  },
	  {
		_id: '654564768af01337b10b56e1',
		firstName: 'Fedrick',
		lastName: 'Cummings',
		email: 'fcummings9696.com'
	  },
	  {
		_id: '65456e9b8af01337b10b56e2',
		firstName: 'Clark',
		lastName: 'Kent',
		email: 'manosteele@gmail.com'
	  },
	  {
		_id: '65456ebc8af01337b10b56e3',
		firstName: 'Bruce',
		lastName: 'Willis',
		email: 'realmfcowboy@live.com'
	  },
	  {
		_id: '65456ee08af01337b10b56e4',
		firstName: 'Mandy',
		lastName: 'Moore',
        email: 'Kcandy18@gmail.com'
	  }

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

