'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import Userpage from './components/Userpage'
import Products from './components/Products'

import { selectUser } from './reducers/user'
import { receiveAllProducts } from './reducers/products'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

const onUserpageEnter = (nextRouterState) => {
  const userId = nextRouterState.params.id;
  store.dispatch(selectUser(userId))
}

const onProductsEnter =(nextRouterState) => {
  store.dispatch(receiveAllProducts())
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/user/:id" component={Userpage} onEnter={onUserpageEnter} />
        <Route path="/products" component={Products} onEnter={onProductsEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
