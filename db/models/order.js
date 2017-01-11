'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

//order instance has userId

const Order = db.define('order', {
  status: Sequelize.ENUM('open', 'closed')

},{
  getterMethods: {
    total: function() {
      this.getOrderlines()
      .then(foundOrderlines => foundOrderlines.subtotal)
      .then(subtotal => {
        subtotal.reduce(el => {
          return
        })
      })
    }
  }
})

module.exports = Order
