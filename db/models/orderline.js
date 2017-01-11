'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')


//orderline is association class
  //contains orderId and productId, no orderlineId

const Orderline = db.define('orderlines', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  itemPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  getterMethods: {
    subtotal: function() {
      if (this.itemPrice) {
        return this.itemPrice*this.quantity
      } else return '';
    }
  }
})

module.exports = Orderline
