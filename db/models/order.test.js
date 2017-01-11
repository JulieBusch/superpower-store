'use strict'

const db = require('APP/db')
const Orderline = require('./orderline')
const Order = require('./order')
const User = require('./user')
const {expect} = require('chai')

describe('Order model', () => {
  beforeEach('wait for the db', () => db.didSync)


})
