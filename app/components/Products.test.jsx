import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {stub} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'



import ProductsContainer, {Products} from './Products'

describe('<Products />', () => {
  const superpower = {
    name: 'Flight',
    image:'hjkhk',
    description: 'hkjdhkjh',
    price: 12.00,
    tags: ["cool", "awesome"],
    thumbnail: 'hjkhk'
  };

  const state = {
    products: [superpower]
  }

  let root, store
  beforeEach('render the root', () => {
    //store = createStore(state => state, state)
    //console.log("store", store, "state", store.getState());
    root = shallow(<Products products={[superpower]}/>)
    //console.log(root);
  })

  it('shows a superpower', () => {
    expect(root.find('h4').text()).equal(superpower.name)
    expect(root.find('img')).to.have.length(1)
  })

})


describe('<Products /> Connection', () => {
  const superpower = {
    name: 'Flight',
    image:'hjkhk',
    description: 'hkjdhkjh',
    price: 12.00,
    tags: ["cool", "awesome"],
    thumbnail: 'hjkhk'
  };

  const state = {
    products: {products: [superpower]}
  }

  let root, store
  beforeEach('render the root', () => {
    store = createStore(state => state, state)
    root = shallow(<ProductsContainer store={store}/>)
  })

  it('shows a superpower', () => {
    expect(root.find(Products))
      .to.have.prop('products')
      .eql(state.products.products)
  })

})

