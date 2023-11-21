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

module.exports.isLoggedIn = _isLoggedIn;
module.exports.storeReturn = _storeReturnTo;
