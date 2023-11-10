const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError');
const guest = require('../models/guest');

// view a guest
const _getGuest = catchAsync( async (req, res) => {
    const { id } = req.params;
	const registeredGuest = await guest.findById(id);

	if(!registeredGuest) throw new expressError('Can not locate', 501 );

	res.render('guests/index', { title: `${registeredGuest.firstName}`, registeredGuest });

});

// get guest registration form
const _getGuestForm = (req, res) => {
    res.render('guests/new', { title: 'Register' });
}

// create/register a guest
const _registerGuest = catchAsync( async (req, res) => {
    const { firstName, LastName, email } = req.body.guest

	const newGuest = new guest({
        firstName: firstName,
		lastName: lastName,
		email: email
	});

    const newG = await user.register(newGuest, password);

	//const newG = await newGuest.save();
    if(!newG) throw new expressError('Unable to register guest', 500);

	res.redirect('/guests');
});

// edit a guest
const _editGuest = catchAsync( async (req, res) => {
	const { id } = req.params;
	const registeredGuest = await guest.findById(id);
	if(!registeredGuest) throw new expressError('Unable to find guest', 409);

	res.redirect('/');
})

// delete a guest
const _deleteGuest = catchAsync( async (req, res) => {
	const { id } = req.params;
	const dGuest = await guest.findByIdAndDelete(id);

	if(!dGuest) throw new expressError('Unable to find and delete', 409);

	res.redirect('/');
})

// get a list of guests
const _getListOfGuests = catchAsync( async (req, res) => {
	const guests = await guest.find({});

	if(!guests) throw new expressError('unable to find any', 500);

	res.render('guests/guestList', { title: 'Guests', guests });

});


module.exports.getGuest = _getGuest;
module.exports.getGuestForm = _getGuestForm;
module.exports.registerGuest = _registerGuest;
module.exports.editGuest = _editGuest;
module.exports.deleteGuest = _deleteGuest;
module.exports.getListOfGuests = _getListOfGuests;
