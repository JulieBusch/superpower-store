'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Order = db.model('orders');
const Product = db.model('products')
const Orderline = db.model('orderlines')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')


// handles orderId param, sets order to req.order
router.param('orderId', function(req, res, next, orderId) {
  Order.findById(orderId)
  .then(foundOrder => {
    req.order = foundOrder
    next()
   })
  .catch(next)
})

// handles productId param, sets product to req.product
router.param('productId', function(req, res, next, productId) {
  Product.findById(productId)
  .then(foundProduct => {
    req.product = foundProduct
    next()
  })
  .catch(next)
})


// for ADMIN ONLY, get all orders
router.get('/', function(req, res, next) {
  Order.findAll()
  .then(Orders => res.send(Orders))
  .catch(next);
});

// find an order by id
router.get('/:orderId', function(req, res, next) {
  res.send(req.order)
  //.catch(next);
});

// find an order's products (and orderlines)
router.get('/:orderId/orderline', function(req, res, next) {
  req.order.getProducts()
  .then(result => res.send(result))
  .catch(next)
})

// find an open order by userId
router.get('/user/:userId/open', function(req, res, next) {
  Order.findOne({where: {
    user_id: req.params.userId,
    status: 'open'
  }})
  .then((foundOrder) => {
    if (foundOrder) { res.send(foundOrder) }
    else { res.send("Your shopping cart is empty!")}
  })
  .catch(next)
})

// find all user's orders by userId
router.get('/user/:userId', function(req, res, next) {
  Order.findAll({where: {
    user_id: req.params.userId
  }})
  .then( (foundOrders) => {
    if (foundOrders) { res.send(foundOrders) }
    else { res.send("No Orders Found!")}
  })
  .catch(next)
})

// create new order
router.post('/', function(req, res, next) {
  Order.create({
    status: 'open',
    // if signed in
    user_id: req.user ? req.user.id : null
  })
  .then( (newOrder) => {
    res.status(201).json(newOrder)
  })
  .catch(next);
})

// add user to an existing order
router.put('/:orderId/setuser/:userId', function(req, res, next) {
  req.order.setUser(req.params.userId)
  .then(updatedOrder => res.send(updatedOrder))
  .catch(next)
})


// change status of order
router.put('/:orderId', function(req, res, next) {
  req.order.update(req.body)
  .then(updatedOrder => res.send(updatedOrder))
  .catch(next);
});


// add/update item to order
router.put('/:orderId/product/:productId', function(req, res, next) {
  // Maybe try this?
  //
  // const {productId, orderId, quantity} = req.params
  // Orderline.findOrCreate({where: {productId, orderId}})
  //   .then(line => line.increment('quantity', {by: quantity}))
  //   .then(() => Order.findById(orderId))
  //   .then(order => res.send(order))

  req.order.getProducts({
    where: { id: req.product.id }
  })
  .then( foundProduct => {
    // if product already exists in order
     if (foundProduct.length) {
      return req.order.addProduct(req.product, {
        // Classic race condition; kindof low priority tho ~ ak
        quantity: foundProduct[0].orderlines.quantity + 1
      })
    } else {
      return req.order.addProduct(req.product, {
        itemPrice: req.product.price,
        quantity: 1
      })
    }
  })
  .then(() => {
    // Unneeded (I think)
    return req.order.save()
  })
  .then(result => res.send(result))
  .catch(next)
})

// remove item from order
router.delete('/:orderId/product/:productId', function(req, res, next) {
  req.order.removeProduct(req.product)
  .then(() => {
    res.sendStatus(200)
  })
})




module.exports = router;
