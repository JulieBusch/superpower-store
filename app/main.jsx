'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'

import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Userpage from './components/Userpage'
import Products from './components/Products'
import Cart from './components/Cart'

import SingleProduct from './components/SingleProduct'
import ReviewForm from './components/ReviewForm'

<<<<<<< HEAD
import {
  receiveAllProducts,
  receiveSingleProduct,
  receiveSimilarProducts,
  receiveProductReviews,
  clearSelectedProduct
  } from './reducers/products'
=======
import { receiveAllProducts, receiveSingleProduct, receiveSimilarProducts } from './reducers/products'
import { getOpenOrderByUserId, selectOrderDetails, selectOrder } from './reducers/order'

>>>>>>> 871050f865225054602645f591d94a80433e47b8
import Success from './components/Success'

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

<<<<<<< HEAD
const onProductsEnter =(nextRouterState) => {
  store.dispatch(clearSelectedProduct())
=======
const onProductsEnter = (nextRouterState) => {
>>>>>>> 871050f865225054602645f591d94a80433e47b8
  store.dispatch(receiveAllProducts())
}

const onCartEnter = (nextRouterState) => {

  store.dispatch(selectOrder(7))
  .then(() => {
    const orderId = store.getState().orders.selectedOrder.id
    store.dispatch(selectOrderDetails(orderId))
  })
}

const onSingleItemEnter = (nextRouterState) => {
  const productId = nextRouterState.params.id;
  store.dispatch(receiveSingleProduct(productId))
  store.dispatch(receiveSimilarProducts(productId))
  store.dispatch(receiveProductReviews(productId))
}

render (
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
<<<<<<< HEAD
        <Route path="/review" component={ReviewForm} />
=======
        <Route path="/cart" component={Cart} onEnter={onCartEnter}/>
>>>>>>> 871050f865225054602645f591d94a80433e47b8
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
