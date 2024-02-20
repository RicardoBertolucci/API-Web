const express = require("express");
const ContactController = require("../controllers/contactController");

const router = express.Router();

router
    .get("/contacts", ContactController.listAllContacts);

module.exports = router;