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

  it('show order history', () => {
    expect(wrapper.find('ul')).to.have.length(5)
  })

  // it('order history list can be clicked to show detail', () => {
  //   const submit = wrapper.find('input[type="submit"]')
  //   expect(submit).to.have.length(1)
  // })

})
