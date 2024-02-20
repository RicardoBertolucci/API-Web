const NotFound = require('../errors/NotFound');
const database = require('../models');

class ContactController {
  static async listAllContacts(req, res, next) {
    const contactsFound = await database.Contact.findAll();

    try {
      if(contactsFound.length < 1) {
        next(new NotFound("No Contact found"));
      } else {
        res.status(200).send(contactsFound);
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ContactController;