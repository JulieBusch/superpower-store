'use strict'

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe("'Product' model", () => {
	before('wait for the db', () => db.didSync)

	var superpower;
	beforeEach(function(){
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
				expect(savedPower.tags).to.deep.equal(['helpful','ethical']);
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
		var secondPower;
		before(function(){
			secondPower = Product.create({
				name: 'SuperHearing',
				image: 'someImage',
				description: 'Hear Really Well',
				price: 35.00,
				tags: ['helpful', 'dubious'],
				thumbnail: 'littleImage'
			});
		});

		var thirdPower;
		before(function(){
			thirdPower = Product.create({
				name: 'Immortality',
				image: 'someImage',
				description: 'Never die',
				price: 2000.00,
				tags: ['lonely', 'awesome'],
				thumbnail: 'littleImage'
			});
		});	


		it('returns all products with matching tags', function(){
			return superpower.save()
			.then(savedPower => savedPower.findSimilarItems())
			.then(similarProducts => {
				console.log(similarProducts);
				expect(similarProducts[0]).to.deep.equal(secondPower);
			})
		})




		xit('does not return products without matching tags')

		xit('does not return itself')
	})






})