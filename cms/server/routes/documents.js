const express = require('express');
const router = express.Router();

const documentsController = require('../controllers/documents');


router.use('/', documentsController.getDocuments);

// //post route

// router.post('/', documentsController.createUser);

// //put route
// router.put('/:id', documentsController.updateUser);

// //delete route
// router.delete('/:id', documentsController.deleteUser);

module.exports = router;