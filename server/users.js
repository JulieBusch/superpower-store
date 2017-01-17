'use strict'

const db = require('APP/db')
const User = db.model('users')
const Review = db.model('reviews');

const {mustBeLoggedIn, forbidden} = require('./auth.filters')

module.exports = require('express').Router()

	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))

	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))



	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))

  .get('/:id/reviews', function(req, res, next) {
    Review.findAll({
      where: {
        user_id: +req.params.id
      }
    })
    .then(reviews => res.send(reviews))
    .catch(next)

  .post('/:id/addReview', function(req, res, next) {
    Review.create(req.body)
    .then(review => res.send("review saved successfully"))
    .catch(next)
  })

});
