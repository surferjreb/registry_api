const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

/* GET users listing. */
router.get('/', isLoggedIn, userController.getListOfUsers );

// get new user form
router.get('/new', userController.getNewUserForm );

// create new user
router.post('/new', userController.createUser );

router.get('/login', userController.getLoginForm );

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login'}), userController.loginUser );

router.get('/logout', userController.logoutUser );

// show user
router.get('/:id', userController.getUser );


module.exports = router;
