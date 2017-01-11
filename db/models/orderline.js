'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')

//orderline is association class
  //contains orderId and productId, no orderlineId

const Orderline = db.define('orderlines', {
  quantity: Sequelize.INTEGER,
  itemPrice: Sequelize.DECIMAL(10, 2)
})

module.exports = Orderline
