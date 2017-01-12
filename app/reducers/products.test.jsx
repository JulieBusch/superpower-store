import {expect} from 'chai'
import products from './products'

describe('the products reducer', () => {
const initialState = {products: []}
const superpower = {
    name: 'Flight',
    image:'hjkhk',
    description: 'hkjdhkjh',
    price: 12.00,
    tags: ["cool", "awesome"],
    thumbnail: 'hjkhk'
  };

	it('starts with an empty array on state', () => {
		const next = products(undefined, {type: '@@INIT'})
		expect(next).to.deep.equal(initialState)
	})

	it('on RECEIVE_ALL_PRODUCTS(products), its state becomes products', () => {
		const next = products(initialState, 
			{type: 'RECEIVE_ALL_PRODUCTS', products: [superpower]})
		expect(next).to.eql({products: [superpower]})
	})
})