import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {Navbar} from './Navbar'
import {Link} from 'react-router'

describe('<Navbar />', () => {
  let wrapper
  beforeEach('render the Navbar wrapper', () =>
    wrapper = shallow(<Navbar />)
  )

  it('shows signup and login links when there is no currentUser', () => {
    expect(wrapper.find('.login-ul')).childAt(0).to.have.html('<li><a href="/signup" activeClass="active">signup</a></li>')
    expect(wrapper.find('.login-ul')).childAt(1).to.have.html('<li><a href="#" activeClass="active">login</a></li>')
  })

  it('shows the login component when login link is clicked', () => {
    wrapper.find('.login-ul').childAt(1).simulate('click');
    expect(wrapper.find('input[name="username"]')).to.have.length(1)
    expect(wrapper.find('input[name="password"]')).to.have.length(1)
  })

  // it('has a login button', () => {
  //   const submit = root.find('input[type="submit"]')
  //   expect(submit).to.have.length(1)
  // })

  // describe('when submitted', () => {
  //   const login = spy()
  //   const root = shallow(<Login login={login}/>)
  //   const submitEvent = {
  //     preventDefault: spy(),
  //     target: {
  //       username: {value: 'bones@example.com'},
  //       password: {value: '12345'},
  //     }
  //   }

  //   beforeEach('submit', () => {
  //     login.reset()
  //     submitEvent.preventDefault.reset()
  //     root.simulate('submit', submitEvent)
  //   })

  //   it('calls props.login with credentials', () => {
  //     expect(login).to.have.been.calledWith(
  //       submitEvent.target.username.value,
  //       submitEvent.target.password.value,
  //     )
  //   })

  //   it('calls preventDefault', () => {
  //     expect(submitEvent.preventDefault).to.have.been.called
  //   })
  })

