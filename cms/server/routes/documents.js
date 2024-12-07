const express = require('express');
const router = express.Router();

const documentsController = require('../controllers/documents');


router.get('/', documentsController.getDocuments);

router.get('/:id', documentsController.getDocumentById);

//post route

router.post('/', documentsController.postDocument);

//put route
router.put('/:id', documentsController.putDocument);

//delete route
router.delete('/:id', documentsController.deleteDocument);

module.exports = router; 