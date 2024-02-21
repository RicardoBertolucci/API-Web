const express = require("express");
const ContactController = require("../controllers/contactController");

const router = express.Router();

router
    .get('/contacts', ContactController.listAllContacts)
    .get('/contacts/:id', ContactController.listContactById)
    .post('/contacts', ContactController.createContact)
    .post('/contacts/:id', ContactController.updateContact)
    .delete('/contacts/:id', ContactController.deleteContact);

module.exports = router;