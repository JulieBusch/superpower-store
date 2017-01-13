import {expect} from 'chai'
import user from './user'

describe('the user reducer', () => {

  it('starts with empty array in state for users', () => {
    const next = user(undefined, {type: '@@INIT'})
    expect(next.users).to.deep.equal([])
  })

  it('starts with empty object in state for selected user', () => {
    const next = user(undefined, {type: '@@INIT'})
    expect(next.selectedUser).to.deep.equal({})
  })

  it('on CREATED_USER(user: any), its state adds the new user to the users list', () => {
    const sampleState = {
      users: [{email: 'sample@1.com'}, {email: 'sample@2.com'}],
      selectedUser: {}
    }

    const next = user(sampleState, {type: 'CREATED_USER', user: {email: 'hello@greet.com'} })

    expect(next.users).to.deep.equal([
      {email: 'hello@greet.com'},
      {email: 'sample@1.com'},
      {email: 'sample@2.com'}
    ])
  })

})
