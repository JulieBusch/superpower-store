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
      order.getProducts()
      .then( orderProducts => {
        let newTotal = orderProducts.reduce((a, b) => {
          return a.orderlines.subtotal + b.orderlines.subtotal
        }, 0)
        order.update({ total: newTotal })
      })
      .catch(err => console.log(err))
    }

    //   return Orderline.findAll({
    //     where: {
    //       order_id: order.id
    //     }
    //   })
    //   .then(foundOrderlines => {
    //     let subtotalTest = foundOrderlines.map(function(ol){
    //       return ol.subtotal
    //     })
    //     return subtotalTest
    //   })
    //   .then(subtotals => {
    //     let total = subtotals.reduce(function(a, b) {
    //       return a + b
    //     }, 0)
    //     return order.update({
    //       total: total
    //     })

  }
})

module.exports = Order
