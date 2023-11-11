const catchAsync = require('../utils/catchAsync');
const expressError = require('../utils/ExpressError');
const passport = require('passport');
const user = require('../models/user');


// get a user
_getUser = async (req, res) => {
    const { id } = req.params;
    const u = await user.findById(id);
    if(!u) throw new expressError('user not found', 505 );

    res.render('users/userView', { title: "user", u});
}

// Get new user form
_getNewUserForm = (req, res) => {
    res.render('users/new', { title: 'Create User' });
}

// create a user
_createUser = async (req, res) => {
    const { username, password, email } = req.body

    const u = new user({email: email, username });
    const newUser = await user.register(u, password);
    if(!newUser) throw new expressError('Incorrect username or password', 401 )
    res.redirect(`/users/${newUser._id}`);
}

// return a list a users
_getListOfUsers = async (req, res) => {
    const foundUsers = await user.find({});
    if(!foundUsers) throw new expressError('Unable to locate', 502);

    res.render('users/userList', { title: 'Users', foundUsers });
}

_getLoginForm = (req, res) => {
    res.render('users/login', { title: 'Login' });
}

_loginUser = (req, res) => {
    res.redirect('/');
};

_logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if(err) {
            return next(err);
        }
        res.redirect('/users/login');
    });

}

_editUser = catchAsync( async (req, res,) => {
    res.send('stuff happens here..  Magic...  ');
});

_deleteUser = catchAsync( async (req, res) => {
    res.send('delete stuff here');
});


module.exports.getUser = _getUser;
module.exports.createUser = _createUser;
module.exports.getListOfUsers = _getListOfUsers;
module.exports.getNewUserForm = _getNewUserForm;
module.exports.getLoginForm = _getLoginForm;
module.exports.loginUser = _loginUser;
module.exports.logoutUser = _logoutUser;
module.exports.editUser = _editUser;
module.exports.deleteUser = _deleteUser;

