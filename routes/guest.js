const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');


// get guest view
router.get('/', guestController.getListOfGuests );

// get new guest form
router.get('/new', guestController.getGuestForm );

// create/register guest
router.post('/new', guestController.registerGuest );

// update/edit a guest
router.put('/:id', guestController.editGuest );

// delete a guest
router.delete('/:id', guestController.deleteGuest );


module.exports = router;
