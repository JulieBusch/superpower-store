'use strict'

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe("'Product' model", () => {
	beforeEach('wait for the db', () => db.didSync)

	var superpower;
	before(function(){
		superpower = Product.build({
			name: 'Healing',
			image: 'someImage',
			description: 'Heal Super Fast',
			price: 29.95,
			tags: ['helpful', 'ethical'],
			thumbnail: 'littleImage'
		});
	});


	describe('attributes definition', function(){

		it('includes all fields', function(){
			return superpower.save()
			.then(function(savedPower){
				expect(savedPower.name).to.equal('Healing');
				expect(savedPower.image).to.equal('someImage');
				expect(savedPower.description).to.equal('Heal Super Fast');
				expect(savedPower.price).to.equal('29.95');
				expect(savedPower.tags).to.deep.equal(['helpful', 'ethical']);
				expect(savedPower.thumbnail).to.equal('littleImage');
			})
		})

		it('requires all fields', function(){
			var emptyPower = Product.build({
				name: null,
				image: null,
				description: null,
				price: null,
				tags: null,
				thumbnail: null
			});

			return emptyPower.validate()
			.then(function(result){
				expect(result).to.be.an.instanceOf(Error);
        		expect(result.message).to.contain('name cannot be null');
        		expect(result.message).to.contain('image cannot be null');
        		expect(result.message).to.contain('description cannot be null');
        		expect(result.message).to.contain('price cannot be null');
        		expect(result.message).to.contain('tags cannot be null');
        		expect(result.message).to.contain('thumbnail cannot be null');
			});
		});

		it('can handle a long description', function(){
			var longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			superpower.description = longDescription;
			return superpower.save()
			.then(function(savedPower){
				expect(savedPower.description).to.equal(longDescription);
			})
		})
	})

	describe('`findSimilarItems` instance method', function(){

		var secondPower, thirdPower;

		before(function(){
			secondPower = Product.build({
				name: 'SuperHearing',
				image: 'someImage',
				description: 'Hear Really Well',
				price: 35.00,
				tags: ['helpful', 'dubious'],
				thumbnail: 'littleImage'
			});

			thirdPower = Product.build({
				name: 'Immortality',
				image: 'someImage',
				description: 'Never die',
				price: 2000.00,
				tags: ['lonely', 'awesome'],
				thumbnail: 'littleImage'
			});

			return Promise.all([secondPower, thirdPower]);

		});


		it('returns all products with matching tags', function(){
			let secondInstance;
			return Promise.all([superpower.save(), secondPower.save(), thirdPower.save()])
			.then(([first, second, third]) => {
				secondInstance = second;
				return first.findSimilarItems()
			})
			.then(similarProducts => {
				expect(similarProducts[0].dataValues).to.deep.equal(secondInstance.dataValues);
			})
		})

		it('does not return products without matching tags', function() {
			let thirdInstance;
			return Promise.all([superpower.save(), secondPower.save(), thirdPower.save()])
			.then(([first, second, third]) => {
				thirdInstance = third;
				return first.findSimilarItems()
			})
			.then(similarProducts => {
				expect(similarProducts.length).to.equal(1)
				expect(similarProducts[0].dataValues).to.not.deep.equal(thirdInstance.dataValues);
			})
		})

		it('does not return itself', function() {
			let firstInstance;
			return Promise.all([superpower.save(), secondPower.save(), thirdPower.save()])
			.then(([first, second, third]) => {
				firstInstance = first;
				return first.findSimilarItems()
			})
			.then(similarProducts => {
				expect(similarProducts.length).to.equal(1)
				expect(similarProducts[0].dataValues).to.not.deep.equal(firstInstance.dataValues);
			})
		})
	})






})
