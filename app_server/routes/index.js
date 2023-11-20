const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const guestController = require('../controllers/guestController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const passport = require('passport');
const { isLoggedIn } = require('../../app_api/middleware');


/* GET home page. */
router.get('/', indexController.getIndex );
// router.get('/testJSON', indexController.testJSON );

// User routes
router.get('/users', isLoggedIn, userController.getListOfUsers );

router.get('/users/new', userController.getNewUserForm );

router.post('/users/new', userController.createUser );

router.get('/users/login', userController.getLoginForm );

router.post('/users/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/users/login'}), userController.loginUser );

router.get('/users/logout', userController.logoutUser );

router.get('/users/:id', isLoggedIn, userController.getUser );

router.put('/users/:id', isLoggedIn, userController.editUser );

router.delete('/users/:id', isLoggedIn, userController.deleteUser );

// Guest routes
router.get('/guests', guestController.getListOfGuests );

router.get('/guests/new', guestController.getGuestForm );

router.post('/guests/new', guestController.registerGuest );

router.get('/guests/login', guestController.getGuestLoginForm );

router.post('/guests/login', passport.authenticate('local-guest', { failureFlash: true, failureRedirect: '/guests/login'}), guestController.loginGuest );

router.get('/guests/logout', guestController.logoutGuest );

router.get('/guests/:id', guestController.getGuest );

router.put('/guests/:id', isLoggedIn, guestController.editGuest );

router.delete('/guests/:id', isLoggedIn, guestController.deleteGuest );



// Comment routes
router.get('/guests/:id/comment/new', commentController.getCommentForm );

router.post('/guests/:id/comment/new', commentController.createComment );

router.get('/guests/:id/comment/:cid', commentController.getComment );

router.put('/guests/:id/comment/:cid', commentController.editComment );

router.delete('/guests/:id/comment/:cid', commentController.deleteComment );




module.exports = router;
