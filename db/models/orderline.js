'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Product = require('./product')

//orderline is association class
  //contains orderId and productId, no orderlineId

const Orderline = db.define('orderline', {
  quantity: Sequelize.INTEGER,
  itemPrice: {
    type: Sequelize.DECIMAL(10,2),
    get: function() {
      const productId = this.product_id
      Product.findById(productId)
      .then(foundProduct => foundProduct.price)
      .then(productPrice => {
        return productPrice
      })
    }
  }

})



module.exports = Orderline
