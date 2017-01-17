import {expect} from 'chai'
import order from './order'

describe('the order reducer', () => {

  it('starts with empty array in state for orders', () => {
    const next = order(undefined, {type: '@@INIT'})
    expect(next.orders).to.deep.equal([])
  })

  it('starts with empty object in state for selected order', () => {
    const next = order(undefined, {type: '@@INIT'})
    expect(next.selectedOrder).to.deep.equal({})
  })

  it('on CREATED_ORDER, its state adds the new order to the orders list', () => {
    const sampleState = {
      orders: [{status: 'open'}],
      selectedOrder: {}
    }

    const next = order(sampleState, {type: 'CREATED_ORDER', order: {status: 'pending'} })

    expect(next.orders).to.deep.equal([
      {status: 'pending'},
      {status: 'open'}
    ])
  })

})
