'use strict'

const db = require('APP/db')
const Orderline = require('./orderline')
const Order = require('./order')
const Product = require('./product')

const {expect} = require('chai')

describe('Backend orders tests', () => {

  beforeEach('wait for the db', () => db.didSync)

  describe('Orderline Model', () => {

    // 'quantity' and 'itemPrice' is a column in this model
    it('has the expected schema definition', () => {
        expect(Orderline.attributes.quantity).to.be.an('object');
    });

    it('has a hook that adds itemPrice and has a virtual field that adds subtotal', function () {

      Product.create({
        name: 'Flight',
        image:'hjkhk',
        description: 'hkjdhkjh',
        price: 13.03,
        tags: ["cool", "awesome"],
        thumbnail: 'hjkhk'
      })
      .then(() => {Order.create({})})
      .then(() => {return Orderline.create({
        order_id: 1,
        product_id: 1,
        quantity: 3,
        //itemPrice: 3.00
       })
      })
      .then(newOl => {
        expect(newOl.itemPrice).to.equal('13.03')
        expect(newOl.subtotal).to.equal(39.09)
      })
    });

  })

})
