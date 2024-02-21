const { Model } = require('sequelize');
const NotFound = require('../errors/NotFound');
const database = require('../models');

class TelephoneController {
  static async listAllTelephones(req, res, next) {
    const telephonesFound = await database.Telephone.findAll();

    try {
      if (telephonesFound.length < 1) {
        next(new NotFound("No telephone found"));
      } else {
        res.status(200).send(telephonesFound);
      }
    } catch (e) {
      return next(e);
    }
  }

  static async listTelephoneById(req, res, next) {
    const { id } = req.params;
    const telephoneFound = await database.Telephone.findOne({ where: { ID: Number(id) } });

    try {
      if (!telephoneFound) {
        return next(new NotFound('No telephone found'));
      }
      res.status(200).send(telephoneFound);
    } catch (e) {
      return next(e);
    }
  }

  static async findAllContactsByTelephone(req, res, next) {
    try {
      const telephonesWithContacts = await database.Telephone.findAll({
        include: {
          model: database.Contact,
          attributes: ['NOME', 'IDADE']
        }
      });

      res.status(200).send(telephonesWithContacts);
    } catch (error) {
      return next(error);
    }
  }

  static async createTelephone(req, res, next) {
    const newTelephone = {
      NUMBER: req.body.number,
      IDCONTACT: req.body.id_contact,
      CREATEAT: new Date(),
      UPDATEAT: new Date()
    }

    try {
      const telephoneCreated = await database.Telephone.create(newTelephone);
      res.status(200).send(telephoneCreated);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async updateTelephone(req, res, next) {
    const { id } = req.params;
    const newTelephone = {
      NUMBER: req.body.number,
      IDCONTACT: req.body.id_contact,
      UPDATEAT: new Date()
    }

    try {
      const telephoneFound = await database.Telephone.findOne({ where: { ID: Number(id)}});

      if(!telephoneFound) {
        return next(new NotFound('telephone not found'));
      }

      await database.Telephone.update(newTelephone, { where: { ID: Number(id) }});
      const telephoneUpdated = await database.Telephone.findOne({ where: { ID: Number(id)}});
      res.status(200).send(telephoneUpdated);
    } catch (e) {
      return next(e);
    }
  }

  static async updateContactByTelephone(req, res, next) {
    const { telephoneId } = req.params;

    const newTelephone = {
      NUMBER: req.body.number,
      UPDATEAT: new Date()
    }

    const newContact = {
      NOME: req.body.name,
      IDADE: req.body.age,
      UPDATEAT: new Date()
    }

    try {
      const telephoneFound = await database.Telephone.findOne({ where: { ID: Number(telephoneId)}});

      if(!telephoneFound) {
        return next(new NotFound('telephone not found'));
      }

      const contactFound = await database.Contact.findOne({ where: { ID: Number(telephoneFound.IDCONTACT)}});

      if(!contactFound) {
        return next(new NotFound('Contact not found'));
      }

      await database.Telephone.update(newTelephone, { where: { ID: Number(telephoneId)}});
      const telephoneUpdated = await database.Telephone.findOne({ where: { ID: Number(telephoneId)}});

      console.log("cheguei aqui")

      if(!telephoneUpdated) {
        return next('Can\'t update telephone');
      }

      await database.Contact.update(newContact, { where: { ID: Number(telephoneUpdated.IDCONTACT)}});
      
      const telephonesWithContacts = await database.Telephone.findAll({
        include: {
          model: database.Contact,
          attributes: ['NOME', 'IDADE']
        }
      });

      res.status(200).send({telephonesWithContacts})
    } catch (e) {
      console.error(e)
      return next(e);
    }
  }

  static async deleteTelephone(req, res, next) {
    const { id } = req.params;
    try {
      const telephoneFound = await database.Telephone.findOne({ where: { ID: Number(id)}});

      if(!telephoneFound) {
        return next(new NotFound('telephone not found'));
      }

      await database.Telephone.destroy({ where: { ID: Number(id)}});
      res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }

  static async deleteContactByTelephone(req, res, next) {
    const { telephoneId } = req.params;

    try {
      const telephoneFound = await database.Telephone.findOne({ where: { ID: Number(telephoneId)}});

      if(!telephoneFound) {
        return next(new NotFound('telephone not found'));
      }

      const contactFound = await database.Contact.findOne({ where: { ID: Number(telephoneFound.IDCONTACT)}});

      if(!contactFound) {
        return next(new NotFound('Contact not found'));
      }

      await database.Telephone.destroy({ where: { ID: Number(telephoneId)}});
      await database.Contact.destroy({ where: { ID: Number(telephoneFound.IDCONTACT)}});
      
      res.status(200).send({ telephoneId, contactId: telephoneFound.IDCONTACT });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = TelephoneController;