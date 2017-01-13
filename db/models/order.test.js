'use strict'

const db = require('APP/db')
const Orderline = require('./orderline')
const Order = require('./order')
const Product = require('./product')

const {expect} = require('chai')

describe('Backend orders tests', () => {

  before('wait for the db', () => db.didSync.then(() => db.sync({force: true})))

 
  describe('Order Model', () => {

    // 'status' is a column in this model
    it('has the expected schema definition', () => {
        expect(Order.attributes.status).to.be.an('object');
    });

    it('has a method that calculates total', function () {

      Product.create({
        name: 'Flight',
        image:'hjkhk',
        description: 'hkjdhkjh',
        price: 13.03,
        tags: ["cool", "awesome"],
        thumbnail: 'hjkhk'
      })
      .then(() => {return Product.create({
        name: 'Laser Vision',
        image:'hjkhk',
        description: 'hkjdhkjh',
        price: 15.05,
        tags: ["dangerous", "awesome"],
        thumbnail: 'hjkhk'      
      })})
      .then(() => {return Order.create({})})
      .then((o) => {
        return Promise.all([
          Orderline.create({
          order_id: o.id,
          product_id: 1,
          quantity: 3,
          }), 

          Orderline.create({
            order_id: o.id,
            product_id: 2,
            quantity: 3,
           })
        ])
        .then(() => {
          return Order.findById(o.id)
        })
      })
      .then( o => {
        console.log("HERE IS O", o)
        expect(o.total).to.equal('105.09')

      })
      .catch(err => console.error(err))
    });    
    })

  })

//})
