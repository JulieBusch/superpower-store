'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Order = db.model('orders');

// for ADMIN ONLY
router.get('/', function(req, res, next) {
  Order.findAll()
  .then(Orders => res.send(Orders))
  .catch(next);
});

// router.get('/:OrderId/similar', function(req, res, next){
//   Order.findById(req.params.OrderId)
//   .then(Order => Order.findSimilarItems())
//   .then(similarOrders => res.send(similarOrders))
//   .catch(next);
// });

router.get('/:orderId', function(req, res, next) {
  Order.findById(req.params.orderId)
  .then(order => {
    console.log('total: ', order.total)
    res.send(order)
  })
  .catch(next);
});



module.exports = router;
