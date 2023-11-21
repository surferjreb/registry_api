const catchAsync = require('../../app_api/utils/catchAsync');
const expressError = require('../../app_api/utils/ExpressError');
const passport = require('passport');
const guest = require('../../app_api/models/guest');


// get a guest
_getGuest = async (req, res) => {
    const { id } = req.params;
    const u = await guest.findById(id);
    if(!u) throw new expressError('guest not found', 505 );

    res.render('guests/guestView', { title: "guest", u});
}

// Get new guest form
_getNewGuestForm = (req, res) => {
    res.render('guests/new', { title: 'Create Guest' });
}

// create a guest
_createGuest = async (req, res) => {
    try{
        const { username, password, firstName, lastName, email } = req.body

        const g = new user({firstName, lastName, email, username});
        const newGuest = await guest.register(g, password);
        if(!newGuest) throw new expressError('Incorrect username or password', 401 )
        req.login(newGuest, err => {
            if (err) return next(err);
            res.redirect(`/guests/${newGuest._id}`);
        })
    } catch (err) {
        res.redirect('/guests/login');
    }

}

// return a list a guests
_getListOfGuests = async (req, res) => {
    const foundGuests = await guest.find({});
    if(!foundGuests) throw new expressError('Unable to locate', 502);

    res.render('guests/guestList', { title: 'guests', foundGuests });
}

_getLoginForm = (req, res) => {
    res.render('guests/login', { title: 'Guest Login' });
}

_loginGuest = catchAsync(async (req, res) => {
    let reDirect = res.locals.returnTo

    try{
        req.flash('success', `Hello!    ${req.guest.username}` );
        if (!reDirect) {
            reDirect = '/'
        }
    } catch (err){
        req.flash('error', err);
        reDirect = '/guests/login';
    }

    res.redirect(reDirect)
});

_logoutGuest = (req, res, next) => {
    req.logout(function (err) {
        if(err) {
            return next(err);
        }
        res.redirect('/guests/login');
    });

}

_editGuest = catchAsync( async (req, res,) => {
    res.send('stuff happens here..  Magic...  ');
});

_deleteGuest = catchAsync( async (req, res) => {
    res.send('delete stuff here');
});


module.exports.getGuest = _getGuest;
module.exports.createGuest = _createGuest;
module.exports.getListOfGuests = _getListOfGuests;
module.exports.getNewGuestForm = _getNewGuestForm;
module.exports.getLoginForm = _getLoginForm;
module.exports.loginGuest = _loginGuest;
module.exports.logoutGuest = _logoutGuest;
module.exports.editGuest = _editGuest;
module.exports.deleteGuest = _deleteGuest;

