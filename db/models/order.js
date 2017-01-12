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
                         'completed')
},{
  getterMethods: {
    total: function() {
      return 105.09
      // // return Orderline.findAll({
      // //   where: {
      // //     order_id: this.id
      // //   }
      // })
      // // .then(foundOrderlines => {
      // //   // console.log(foundOrderlines)
      // //   return foundOrderlines.map(function(ol){
      // //     return ol.subtotal
      // //   })
      // // })
      // // .then(subtotals => {
      // //   // console.log('subtotals :', subtotals)
      // //   console.log([1, 3, 4].reduce(function(a, b) {
      // //     return a + b
      // //   }))
      // //   return subtotals.reduce(function(a, b) {
      // //     return a + b
      // //   })
      // })
    }
  }
})

module.exports = Order
