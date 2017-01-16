'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')


//orderline is association class
  //contains orderId and productId, no orderlineId

const Orderline = db.define('orderlines', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  itemPrice: {
    type: Sequelize.DECIMAL(10, 2)
  },
  subtotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00
  }
},{
  hook: {
    afterSave: function(orderLine) {
      orderLine.subtotal += 100
      // if (orderLine.itemPrice) {
      //   const result = +orderLine.itemPrice * orderLine.quantity
      //   orderLine.subtotal = parseFloat(result.toFixed(2));
      // } 
      //else return;
    }
  },
  // hooks: {
  //   beforeCreate: function(orderlines) {
  //     console.log("Helllooooo")
  //     return Product.findById(orderlines.product_id)
  //     .then((foundProduct) => {
  //       console.log("FOUND PRODUCT", foundProduct)
  //       orderlines.itemPrice = foundProduct.price
  //       return orderlines
  //     })
  //     .catch(err => console.log('ERRRR ', err))
  //   },
  //}
})

module.exports = Orderline
