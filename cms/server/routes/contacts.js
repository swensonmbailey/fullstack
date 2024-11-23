const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts');


router.use('/', contactsController.getContacts);

// //post route

// router.post('/', contactsController.createUser);

// //put route
// router.put('/:id', contactsController.updateUser);

// //delete route
// router.delete('/:id', contactsController.deleteUser);

module.exports = router;