const _isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
       // flash error
       return res.redirect('/users/login');
    }

    next();
}

module.exports.isLoggedIn = _isLoggedIn;
