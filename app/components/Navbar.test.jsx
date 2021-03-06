import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {mount, shallow} from 'enzyme'
import {spy, stub} from 'sinon'
chai.use(require('sinon-chai'))

import NavbarContainer, {Navbar} from './Navbar'
import {Login} from './Login'
import {Link} from 'react-router'
import {createStore} from 'redux'


describe('<Navbar />', () => {

  let wrapper
  beforeEach('render the Navbar wrapper', () => {
    wrapper = shallow(<Navbar />)
  })

  it('shows signup and login links when there is no currentUser', () => {
    expect(wrapper.find('.login-signup')).be.present()
  })

  it('shows the login component when login link is clicked', () => {
    wrapper.setState({clicked: true})
    expect(wrapper.find('#login')).to.have.length(1)
  })

  it('does not show the login component when clicked is false', () => {
    wrapper.setState({clicked: false})
    expect(wrapper.find('#login')).to.have.length(0)
  })

  it('gets prop.currentUser from state.auth', () => {
    const state = {
      auth: {name: 'Johnny'}
    }
    let store, wrapper1, dispatch
    store = createStore(state => state, state)
    dispatch = stub(store, 'dispatch')
    wrapper1 = shallow(<NavbarContainer store={store} />)

    expect(wrapper1.find(Navbar)).to.have.prop('currentUser').eql(state.auth)
  })

})

