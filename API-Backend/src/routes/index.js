const express = require("express");
const contact = require("./contactRoute.js")
const telephone = require("./telephoneRoute.js")

const routes = (app) => {
  app.use(
    express.json(),
    contact,
    telephone
  )
}

module.exports = routes;