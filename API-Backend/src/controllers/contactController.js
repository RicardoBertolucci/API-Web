const NotFound = require('../errors/NotFound');
const database = require('../models');

class ContactController {
  static async listAllContacts(req, res, next) {
    const contactsFound = await database.Contact.findAll();

    try {
      if (contactsFound.length < 1) {
        next(new NotFound("No Contact found"));
      } else {
        res.status(200).send(contactsFound);
      }
    } catch (e) {
      return next(e);
    }
  }

  static async listContactById(req, res, next) {
    const { id } = req.params;
    const contactFound = await database.Contact.findOne({ where: { ID: Number(id) } });

    try {
      if (!contactFound) {
        return next(new NotFound('No contact found'));
      }
      res.status(200).send(contactFound);
    } catch (e) {
      return next(e);
    }
  }

  static async createContact(req, res, next) {
    const newContact = {
      NOME: req.body.name,
      IDADE: req.body.age,
      CREATEAT: new Date(),
      UPDATEAT: new Date()
    }

    console.log(newContact);

    try {
      const contactCreated = await database.Contact.create(newContact);
      res.status(200).send(contactCreated);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async updateContact(req, res, next) {
    const { id } = req.params;
    const newContact = {
      NOME: req.body.name,
      IDADE: req.body.age,
      UPDATEAT: new Date()
    }

    try {
      const contactFound = await database.Contact.findOne({ where: { ID: Number(id)}});

      if(!contactFound) {
        return next(new NotFound('Contact not found'));
      }

      await database.Contact.update(newContact, { where: { ID: Number(id) }});
      const contactUpdated = await database.Contact.findOne({ where: { ID: Number(id)}});
      res.status(200).send(contactUpdated);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteContact(req, res, next) {
    const { id } = req.params;
    try {
      const contactFound = await database.Contact.findOne({ where: { ID: Number(id)}});

      if(!contactFound) {
        return next(new NotFound('Contact not found'));
      }

      await database.Contact.destroy({ where: { ID: Number(id)}});
      res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = ContactController;