const catchAsync = require('../../app_api/utils/catchAsync');
const expressError = require('../../app_api/utils/ExpressError');
const guest = require('../../app_api/models/guest');

// view a guest
const _getGuest = catchAsync( async (req, res) => {
    const { id } = req.params;
	const registeredGuest = await guest.findById(id);

	if(!registeredGuest) throw new expressError('Can not locate', 501 );

	res.render('guests/edit', { title: `${registeredGuest.firstName}`, registeredGuest });

});

// get guest registration form
const _getGuestForm = (req, res) => {
    res.render('guests/new', { title: 'Register' });
}

// create/register a guest
const _registerGuest = catchAsync( async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body

	const newGuest = new guest({
        firstName: firstName,
		lastName: lastName,
		email: email,
		username: username
	});

    const newG = await guest.register(newGuest, password);

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

_getGuestLoginForm = (req, res) => {
    res.render('guests/login', { title: 'Login' });
}

_loginGuest = (req, res) => {
    res.redirect('/');
};

_logoutGuest = (req, res, next) => {
    req.logout(function (err) {
        if(err) {
            return next(err);
        }
        res.redirect('/guests/login');
    });

}


module.exports.getGuest = _getGuest;
module.exports.getGuestForm = _getGuestForm;
module.exports.registerGuest = _registerGuest;
module.exports.editGuest = _editGuest;
module.exports.deleteGuest = _deleteGuest;
module.exports.getListOfGuests = _getListOfGuests;
module.exports.getGuestLoginForm = _getGuestLoginForm;
module.exports.loginGuest = _loginGuest;
module.exports.logoutGuest = _logoutGuest;
