const express = require('express');
const router = express.Router();


const messagesController = require('../controllers/messages');


router.get('/', messagesController.getMessages);

router.get('/:id', messagesController.getMessageById);

//post route

router.post('/', messagesController.postMessage);

//put route
router.put('/:id', messagesController.putMessage);

//delete route
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;