const express = require('express');
const router = express.Router();


const messagesController = require('../controllers/messages');


router.use('/', messagesController.getMessages);

// //post route

// router.post('/', messagesController.createUser);

// //put route
// router.put('/:id', messagesController.updateUser);

// //delete route
// router.delete('/:id', messagesController.deleteUser);

module.exports = router;