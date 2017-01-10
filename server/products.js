'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Product = db.model('products');

router.get('/', function(req, res, next) {
  Product.findAll()
  .then(products => res.send(products))
  .catch(next);
});

router.get('/:productId', function(req, res, next){
	Product.findById(req.params.productId)
	.then(product => product.findSimilarItems())
	.then(similarProducts => res.send(similarProducts))
	.catch(next);
})

module.exports = router;
