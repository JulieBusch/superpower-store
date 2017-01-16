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
  // Maybe alternative?
  //
  // instanceMethods: {
  //   getTotal() {
  //     return this.getOrderItems()
  //       //.then(items => items.reduce((total, {price, qty}) => ... ))
  //   }
  // },
  hooks: {
    beforeUpdate: function(order) {
      //order.total = 33.33
      return order.getProducts()
        .then( orderProducts => {
          let newTotal = orderProducts.reduce((a, b) => {
            return a + b.orderlines.subtotal
          }, 0)
          return order.update({ total: newTotal })
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
    //   })
    //   .catch(err => console.log(err))

  }
})

module.exports = Order
