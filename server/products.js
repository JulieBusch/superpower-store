'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Product = db.model('products');

router.get('/', function(req, res, next) {
  console.log(req.user)
  Product.findAll()
  .then(products => res.send(products))
  .catch(next);
});

router.get('/:productId/similar', function(req, res, next){
	Product.findById(req.params.productId)
	.then(product => product.findSimilarItems())
	.then(similarProducts => res.send(similarProducts))
	.catch(next);
});

router.get('/:productId', function(req, res, next) {
  Product.findById(req.params.productId)
  .then(product => res.send(product))
  .catch(next);
});



//admin only, alter product price
// router.put('/:productId/price/:price', function(req, res, next) {
//   Product.findById(req.params.productId)
//   .then(product => {
//     product.update({ price: req.params.price })
//   })
//   .then(updatedProduct => res.send(updatedProduct))
//   .catch(next)
// })

module.exports = router;
