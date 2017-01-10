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

import { selectUser } from './reducers/user'


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <Navbar/>
      {children}
    </div>
)

const onUserpageEnter = (nextRouterState) => {
  const userId = nextRouterState.params.id;
  store.dispatch(selectUser(userId))
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signup" component={SignUp} />
        <Route path="/user/:id" component={Userpage} onEnter={onUserpageEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
