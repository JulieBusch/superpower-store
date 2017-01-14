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
    beforeSave: function(order) {
    //   order.total = 105.09
    //console.log("orderId", order.id)
      return Orderline.findAll({
        where: {
          order_id: order.id
        }
      })
      .then(foundOrderlines => {
        console.log("foundOrderlines", foundOrderlines)
        let subtotalTest = foundOrderlines.map(function(ol){
          return ol.subtotal
        })
        console.log("subtotal test", subtotalTest)
        return subtotalTest
      })
      .then(subtotals => {
        let total = subtotals.reduce(function(a, b) {
          return a + b
        }, 0)
        //console.log("total", total)
        return order.update({
          total: total
        })
        //console.log("order.total", order.total)
      })
     }
  }
})

module.exports = Order
