'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('APP/db');

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  thumbnail: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  instanceMethods: {
    findSimilarItems: function() {
      Product.findAll({
        where: {
          tags: { $contains: this.tags }
        }
      });
    }
  }
});

module.exports = Product
