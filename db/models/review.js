'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = db.define('reviews', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5}
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [50, 2000]}
    }
  }
});

module.exports = Review
