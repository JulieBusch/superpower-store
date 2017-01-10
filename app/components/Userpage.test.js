import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {Userpage} from './Userpage'

describe('<Userpage />', () => {
  let wrapper, fakeData
  beforeEach('render the wrapper with filler data', () => {
    fakeData = {
      id: 10,
      name: 'Alice',
      email: 'hello@go.com',
    }
    wrapper = shallow(<Userpage user={fakeData}/>)
  })

  it('shows user info', () => {
    expect(wrapper.find('h2')).to.have.html('<h2>Alice</h2>')
    expect(wrapper.find('h3')).to.have.html('<h3>hello@go.com</h3>')
  })

// ------- TESTS BELOW SHOULD FAIL UNTIL ORDER MODELS HAVE BEEN MADE AND
// ------- ORDER HISTORY/DETAIL COMPONENT NEEDS TO BE RENDERED IN USERPAGE

  // it('show order history', () => {
  //   expect(wrapper.find('ul')).to.have.length(5)
  // })

  // // it('order history list can be clicked to show detail', () => {
  //      fill in test here
  // // })

})
