const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const passport = require('passport');
const { isLoggedIn, storeReturn, isUser } = require('../../app_api/middleware');


/* GET home page. */
router.get('/', indexController.getIndex );
// router.get('/testJSON', indexController.testJSON );

// User routes
router.get('/users', isLoggedIn, userController.getListOfUsers );

router.get('/users/new', isLoggedIn, isUser, userController.getNewUserForm );

router.post('/users/new', isLoggedIn, isUser, userController.createUser );

router.get('/users/login', userController.getLoginForm );

router.post('/users/login', storeReturn, passport.authenticate('user', { failureFlash: true, failureRedirect: '/users/login'}), userController.loginUser );

router.get('/users/logout', userController.logoutUser );

router.get('/users/:id', isLoggedIn, userController.getUser );

router.put('/users/:id', isLoggedIn, userController.editUser );

router.delete('/users/:id', isLoggedIn, userController.deleteUser );

// Comment routes
router.get('/users/:id/comment/new', isLoggedIn, commentController.getCommentForm );

router.post('/users/:id/comment/new', isLoggedIn, commentController.createComment );

router.get('/users/:id/comment/:cid', isLoggedIn, commentController.getComment );

router.put('/users/:id/comment/:cid', isLoggedIn, commentController.editComment );

router.delete('/users/:id/comment/:cid', isLoggedIn, commentController.deleteComment );




module.exports = router;
