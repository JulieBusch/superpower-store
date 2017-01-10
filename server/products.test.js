'use strict'

const app = require('./start');

const db = require('APP/db')
const Product = require('APP/db/models/product')

const {expect} = require('chai')
const request = require('supertest-as-promised')
const agent = request.agent(app)



describe('api/products', function() {

  describe('product catalog route', function() {

    it('GET / returns all products', function() {
      request(app)
        .get('/api/products')
        .expect(200)
        .then(function(res) {
          expect(res.body).to.be.instanceof(Array)
          expect(res.body.length).to.be.above(0)
        })

    });

  });

  describe('find similar products route', function() {

    it('GET /:productId/similar gives all similar products', function() {
      request(app)
        .get('/api/products/1/similar')
        .expect(200)
        .then(function(res) {
          expect(res.body).to.be.instanceof(Array)
          expect(res.body.length).to.be.above(0)
        })
    });

  });

  describe('find single product route', function() {

    it('GET /:productId gives that one product', function() {
      request(app)
        .get('/api/products/1')
        .expect(200)
        .then(function(res) {
          expect(res.body.id).to.equal(1)
        })
    });

  });

});
