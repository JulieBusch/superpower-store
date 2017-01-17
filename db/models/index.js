'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
<<<<<<< HEAD
const Review = require('./review');

Review.belongsTo(User);
Review.belongsTo(Product);
=======
const Order = require('./order')
>>>>>>> 871050f865225054602645f591d94a80433e47b8

const Orderline = require('./orderline')

Product.belongsToMany(Order, {through: Orderline })
Order.belongsToMany(Product, {through: Orderline })

Order.belongsTo(User)
User.hasMany(Order)

module.exports = {User, Product, Order}
