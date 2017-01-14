'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Order = db.model('orders');
const Product = db.model('products')

const {mustBeLoggedIn, forbidden} = require('./auth.filters')


router.param('orderId', function(req, res, next, orderId) {
  Order.findById(orderId)
  .then(foundOrder => {
    req.order = foundOrder
    next()
   })
  .catch(next)
})

router.param('productId', function(req, res, next, productId) {
  Product.findById(productId)
  .then(foundProduct => {
    req.product = foundProduct
    next()
  })
  .catch(next)
})

// for ADMIN ONLY
router.get('/', function(req, res, next) {
  Order.findAll()
  .then(Orders => res.send(Orders))
  .catch(next);
});


// find individual order
router.get('/:orderId', function(req, res, next) {
  res.send(req.order)
  .catch(next);
});

// find individual order's products (and orderlines)
router.get('/:orderId/orderline/', function(req, res, next) {
  req.order.getProducts()
  .then(result => res.send(result))
  .catch(next)
})

// find open order by userId
router.get('/user/:userId', function(req, res, next) {
  Order.findOne({where: {
    user_id: req.params.userId,
    status: 'open'
  }})
  .then((foundOrder) => {
    if(foundOrder) { res.send(foundOrder) }
    else { res.send("Your shopping cart is empty!")}
  })
  .catch(next)
})

// make new order
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

// add item to order
router.put('/:orderId/product/:productId', function(req, res, next) {
  req.order.getProducts()
  .then( products => {
    var match = products.filter(product => {
      return product.id === Number(req.params.productId)
    })
    console.log('MATCH ', match)
    // if product already exists in order
    if (match.length) {
      req.order.addProduct(req.product, { through: { quantity: 6 }})
      //req.product.orderlines.update({quantity: 5})
      .then(product => res.send(product))
      .catch(next)
    } else {

      req.order.addProduct(req.product, { through: { quantity: 3 }})
      .then(product => res.send(product))
      .catch(next)
    }
  })
  .catch(next)
})

//   .then( (products) => {
//     var match = products.filter((product) => {
//       return product.id === req.params.productId
//     })
//     if (match.length) {

//     } else {

//     }
//   })



// })

// update item in order

// remove item from order

// change status of order






module.exports = router;
