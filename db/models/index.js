'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
const Order = require('./order')

const Orderline = require('./orderline')

Product.belongsToMany(Order, {through: Orderline })
Order.belongsToMany(Product, {through: Orderline })

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {User, Product, Order}
