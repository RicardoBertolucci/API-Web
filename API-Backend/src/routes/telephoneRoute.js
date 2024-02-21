const express = require("express");
const TelephoneController = require("../controllers/telephoneController");

const router = express.Router();

router
    .get('/telephones', TelephoneController.listAllTelephones)
    .get('/telephones/contacts', TelephoneController.findAllContactsByTelephone)
    .get('/telephones/:id', TelephoneController.listTelephoneById)
    .post('/telephones', TelephoneController.createTelephone)
    .put('/telephones/:id', TelephoneController.updateTelephone)
    .put('/telephones/:telephoneId/contacts', TelephoneController.updateContactByTelephone)
    .delete('/telephones/:id', TelephoneController.deleteTelephone)
    .delete('/telephones/:telephoneId/contacts', TelephoneController.deleteContactByTelephone);

module.exports = router;