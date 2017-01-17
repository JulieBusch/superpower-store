'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Orderline = require('./orderline')

//order instance has userId

const Order = db.define('orders', {
  status: Sequelize.ENUM(
                         'open',
                         'recieved',
                         'shipping',
                         'completed'),
  total: Sequelize.DECIMAL(10, 2)
},{
  hooks: {
    beforeUpdate: function(order) {
      //order.total = 33.33
      return order.getProducts()
      .then( orderProducts => {
        let newTotal = orderProducts.reduce((a, b) => {
          return a + b.orderlines.subtotal
         }, 0)
        return order.total = newTotal
      })
      .catch(err => console.log(err))
    }

  }
})

module.exports = Order
