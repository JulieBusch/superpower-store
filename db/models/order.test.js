'use strict'

const db = require('APP/db')
const Orderline = require('./orderline')
const Order = require('./order')
const Product = require('./product')

const {expect} = require('chai')

describe('Backend orders tests', () => {

  beforeEach('wait for the db', () => db.didSync)

  describe('Order Model', () => {

    // 'status' is a column in this model
    it('has the expected schema definition', () => {
        expect(Order.attributes.status).to.be.an('object');
    });

    it('has a method that calculates total', function () {

      const prod1 = Product.create({
        name: 'Flight',
        image:'hjkhk',
        description: 'hkjdhkjh',
        price: 13.03,
        tags: ["cool", "awesome"],
        thumbnail: 'hjkhk'
      })

      const prod2 = Product.create({
        name: 'Laser Vision',
        image:'hjkhk',
        description: 'hkjdhkjh',
        price: 22.00,
        tags: ["dangerous", "awesome"],
        thumbnail: 'hjkhk'
      })

      let whatever;

      Promise.all([prod1, prod2])
      .then(() => {

        return Order.create({})

      })
      .then((o) => {

        whatever = o

        const orderline1 = Orderline.create({
          order_id: 1,
          product_id: 3,
          quantity: 3,
          //itemPrice: 3.00
         })

        const orderline2 = Orderline.create({
          order_id: 1,
          product_id: 4,
          quantity: 3,
          //itemPrice: 3.00
         })

        return Promise.all([orderline1, orderline2])
      })
      .then( () => {
        console.log(whatever)
        expect(whatever.total).to.equal(105.09)
      })
      .catch((err) => console.log(err))

    //   .then(() => {return Orderline.create({
    //     order_id: 1,
    //     product_id: 1,
    //     quantity: 3,
    //     //itemPrice: 3.00
    //    })
    //   })
    //   .then(() => {Order.create({})})
    //   .then(newOl => {
    //     expect(newOl.itemPrice).to.equal('13.03')
    //     expect(newOl.subtotal).to.equal(39.09)
    //   })
    })

  })

})
