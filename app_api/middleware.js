const user = require('./models/user');
const expressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');


const _isLoggedIn = (req, res, next) => {

    if(!req.isAuthenticated()){
       // flash error
       req.session.returnTo = req.originalUrl;
       req.flash('error', 'You must be signed in')
       return res.redirect('/users/login');
    }

    next();
}

const _storeReturnTo = (req, res, next) => {
   if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
   }

   next();
}

const _isUser = catchAsync( async (req, res, next) => {
    try{
        const u = await user.findById(req.user._id);
        if(!u) throw new expressError('Unable to locate', 500);

        if(u.userType !== 'user'){
            req.flash('error', 'You do not have access');
            return res.redirect('/')
        }

        next();
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/');
    }

});

module.exports.isLoggedIn = _isLoggedIn;
module.exports.storeReturn = _storeReturnTo;
module.exports.isUser = _isUser;
