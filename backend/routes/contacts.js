// Contact endpoints

const express = require('express');
const contactsController = require('../controllers/contacts');
const router = express.Router();



router.get('/', contactsController.getContacts);
router.get('/:id', contactsController.getOneContact);
router.post('/', contactsController.createContact);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);
module.exports = router;