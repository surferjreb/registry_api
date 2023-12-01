const catchAsync = require('../../app_api/utils/catchAsync');
const expressError = require('../../app_api/utils/ExpressError');
const passport = require('passport');
const user = require('../../app_api/models/user');


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
    try{
        const { username, password, firstName, lastName, email } = req.body

        const u = new user({firstName, lastName, email, username});
        const newUser = await user.register(u, password);
        if(!newUser) throw new expressError('Incorrect username or password', 401 )
        req.login(newUser, err => {
            if (err) return next(err);
            res.redirect(`/users/${newUser._id}`);
        })
    } catch (err) {
        res.redirect('/users/login');
    }

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

_loginUser = catchAsync(async (req, res) => {
    let reDirect = res.locals.returnTo

    try{
        req.flash('success', `Hello!    ${req.user.username}` );
        if (!reDirect) {
            reDirect = '/'
        }
    } catch (err){
        req.flash('error', err);
        reDirect = '/users/login';
    }

    res.redirect(reDirect)
});

_logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if(err) {
            return next(err);
        }
        res.redirect('/users/login');
    });

}

_editUser = catchAsync( async (req, res,) => {
    let redirect = '/';

    try{
        if(req.user.userType === 'user' || req.user._id === req.params.id){
            const u = await user.findById(req.user._id);
            if(!u) throw new expressError('Unable to locate', 500);

            const updateUser = await user.updateOne({_id: u._id}, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            })

            if(!updateUser) throw new expressError('Unable to Update user', 500);
            req.flash('success', `The ${updateUser.username} was updated!`);
            redirect = '/users';
        }
    } catch(err) {
        req.flash('error', err.message);
    }

    res.redirect(redirect);

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

