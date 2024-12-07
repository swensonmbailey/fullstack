const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/contacts');


router.get('/', contactsController.getContacts);

router.get('/:id', contactsController.getContactById);

//post route

router.post('/', contactsController.postContact);

//put route
router.put('/:id', contactsController.putContact);

//delete route
router.delete('/:id', contactsController.deleteContact);

module.exports = router;