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
    type: Sequelize.STRING
  },
}, {
  getterMethods: {
    subtotal: function() {
      if (this.itemPrice) {
        const result = +this.itemPrice * this.quantity
        return parseFloat(result.toFixed(2));
      } else return '';
    }
  },
  hooks: {
    beforeValidate: function(orderlines) {
      console.log("ID ", orderlines.product_id)
      return Product.findById(orderlines.product_id)
      .then((foundProduct) => {
        console.log('foundProduct ', foundProduct)
        orderlines.itemPrice = foundProduct.price
        return orderlines
      })
      .catch(err => console.log('ERRRR ', err))
    }
  }
})

module.exports = Orderline
