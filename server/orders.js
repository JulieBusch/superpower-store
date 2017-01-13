'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Order = db.model('orders');


router.param('/:orderId', function(req, res, next, id) {
  Order.findById(req.params.orderId)
  .then(foundOrder => {
    req.order = foundOrder
  })
})


// for ADMIN ONLY
router.get('/', function(req, res, next) {
  Order.findAll()
  .then(Orders => res.send(Orders))
  .catch(next);
});

router.get('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId)
  .then(order => {
    console.log('total: ', order.total)
    res.send(order)
  })
  .catch(next);
});

// find order by userId
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
router.get('/:orderId/product/:productId', function(req, res, next) {
  Order.findById(req.params.orderId)
  .then(foundOrder => foundOrder.getProducts())
  .then( (products) => {
    var match = products.filter((product) => {
      return product.id === req.params.productId
    })
    if (match.length) {

    } else {

    }
  })



    {
      product_id: req.params.productId
    }
  })
  .then(foundOrderLines => {
    console.log(foundOrderLines)
    res.send(foundOrderLines)
  })
  .catch(next)

})

// update item in order

// remove item from order

// change status of order






module.exports = router;
