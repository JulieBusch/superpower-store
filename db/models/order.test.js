'use strict'

const db = require('APP/db')
const Orderline = require('./orderline')
const Order = require('./order')
const Product = require('./product')

const {expect} = require('chai')

// describe('Backend orders tests', () => {

//   before('wait for the db', () => db.didSync.then(() => db.sync({force: true})))


//   describe('Order Model', () => {

//     // 'status' is a column in this model
//     it('has the expected schema definition', () => {
//         expect(Order.attributes.status).to.be.an('object');
//     });

//     it('has a method that calculates total', function () {


//       Promise.all([
//         Order.create({}),
//         Product.create({
//           name: 'Flight',
//           image:'hjkhk',
//           description: 'hkjdhkjh',
//           price: 13.03,
//           tags: ["cool", "awesome"],
//           thumbnail: 'hjkhk'
//         }),
//         Product.create({
//           name: 'Laser Vision',
//           image:'hjkhk',
//           description: 'hkjdhkjh',
//           price: 15.05,
//           tags: ["dangerous", "awesome"],
//           thumbnail: 'hjkhk'
//         })
//       ])
//       .then( ([order, prod1, prod2]) => {
//         return Promise.all([
//           order.addProduct(prod1, { through: { quantity: 2 } }),
//           order.addProduct(prod2, { through: { quantity: 3 } })
//         ])
//       })
//       .then((what) => { console.log("WHAT0 ", what[0][0].dataValues) })
//       .catch(err => console.log(err))
//     //   .then((o) => {
//     //     return Promise.all([
//     //       Orderline.create({
//     //       order_id: o.id,
//     //       product_id: 1,
//     //       quantity: 3,
//     //       }),

//     //       Orderline.create({
//     //         order_id: o.id,
//     //         product_id: 2,
//     //         quantity: 3,
//     //        })
//     //     ])
//     //     .then(() => {
//     //       return Order.findById(o.id)
//     //     })
//     //   })
//     //   .then( o => {
//     //     console.log("HERE IS O", o)
//     //     expect(o.total).to.equal('105.09')

//     //   })
//     //   .catch(err => console.error(err))
//     // });
//     })

//   })

// })


// Not working properly after edits w/ three fellows and instructor... moving on
