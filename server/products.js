'use strict'

const db = require('APP/db');
const router = require('express').Router();
const Product = db.model('products');

router.get('/', function(req, res, next) {
  // res.send('Hellooooooo');
  Product.findAll()
  .then(products => res.send(products))
  .catch(next);
});

module.exports = router;
