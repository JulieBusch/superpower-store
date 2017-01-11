'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

//order instance has userId

const Order = db.define('orders', {
  status: Sequelize.ENUM('open', 'recieved', 'shipping', 'completed')

// },{
//   getterMethods: {
//     total: function() {
//       this.getOrderlines()
//       .then(foundOrderlines => foundOrderlines.subtotal)
//       .then(subtotal => {
//         subtotal.reduce(el => {
//           return
//         })
//       })
//     }
//   }
})

module.exports = Order
