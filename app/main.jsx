'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Userpage from './components/Userpage'
import Products from './components/Products'
import Splash from './components/Splash'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import SingleProduct from './components/SingleProduct'
import ReviewForm from './components/ReviewForm'
import Success from './components/Success'

import {
  receiveAllProducts,
  receiveSingleProduct,
  receiveSimilarProducts,
  receiveProductReviews,
  clearSelectedProduct
  } from './reducers/products'
import { getOpenOrderByUserId, selectOrderDetails, selectOrder } from './reducers/order'
import { selectUser, getAllUsers } from './reducers/user'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

const onAppEnter = () => {
  store.dispatch(getAllUsers())
}

const onUserpageEnter = (nextRouterState) => {
  const userId = nextRouterState.params.id;
  store.dispatch(selectUser(userId))
  //find user's open order
  store.dispatch(getOpenOrderByUserId(userId))
  //load order history
}


const onProductsEnter = (nextRouterState) => {
  store.dispatch(clearSelectedProduct())
  store.dispatch(receiveAllProducts())
}

const onCartEnter = (nextRouterState) => {
  //store.dispatch(selectOrder(7))
  //.then(() => {
    const orderId = store.getState().orders.selectedOrder.id
    store.dispatch(selectOrderDetails(orderId))
  //})
}

const onSingleItemEnter = (nextRouterState) => {
  const productId = nextRouterState.params.id;
  store.dispatch(receiveSingleProduct(productId))
  store.dispatch(receiveSimilarProducts(productId))
  store.dispatch(receiveProductReviews(productId))
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp} onEnter={onAppEnter}>
        <IndexRedirect to="/products" />
        {/*<Route path="/jokes" component={Jokes} />*/}
        <Route path="/signup" component={SignUp} />
        <Route path="/users/:id" component={Userpage} onEnter={onUserpageEnter} />
        <Route path="/products" component={Products} onEnter={onProductsEnter} />
        <Route path="/products/:id" component={SingleProduct} onEnter={onSingleItemEnter} />
        <Route path="/success" component={Success} />
        <Route path="/review" component={ReviewForm} />
        <Route path="/cart" component={Cart} onEnter={onCartEnter}/>
        <Route path="/checkout" component={Checkout} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
