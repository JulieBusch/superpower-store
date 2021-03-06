import React from 'react'

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {logout as logOutUser} from '../reducers/auth'
import {Link} from 'react-router'
// import Login from './Login'

/* -----------------    COMPONENT     ------------------ */

export class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }

    this.renderLoginSignup = this.renderLoginSignup.bind(this)
    this.renderLoggedIn = this.renderLoggedIn.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({  clicked: !this.state.clicked  })
  }

  render() {
    return (
      <div>
        <nav>
          <div className="container">
            <div className="nav-left">
                <Link className="nav-margins" to="/"><img src="/logo-test.png" /></Link>

                <Link to="/products" className="nav-margins" >products</Link>
            </div>
            <div className="nav-right">
                <Link to="/cart" className="nav-margins">cart</Link>
                { this.props.currentUser ? this.renderLoggedIn() : this.renderLoginSignup() }
            </div>

          </div>
        </nav>
        {this.state.clicked && !this.props.currentUser &&
          <div className="login">
            <form onSubmit={evt => {
              evt.preventDefault()
              this.props.login(
                evt.target.username.value,
                evt.target.password.value
              )
            }}>
              <input
                name="username"
                placeholder="email"
              />
              <input
                name="password"
                type="password"
                placeholder="password"
              />
              <input
                type="submit"
                value="Login"
              />
            </form>
          </div>
        }
      </div>
    )
  }

  renderLoginSignup() {
    return (
      <div className="login-signup">

        <Link to="/signup" className="nav-margins" activeClassName="active">signup</Link>

        <Link className="nav-margins" onClick={this.handleClick}>login</Link>

      </div>
    )
  }

  renderLoggedIn() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    const userId = this.props.currentUser.id;
    return (
      <div>

        <Link to={`/users/${userId}`} className="nav-margins" activeClassName="active">my account</Link>

        <button
          className="log-out-btn nav-margins"
          onClick={this.props.logout}>
          logout
        </button>

      </div>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    currentUser: state.auth
  }
}
// // equivalent to:
// const mapState = state => {
//   return {
//     currentUser: state.currentUser
//   };
// };

const mapDispatch = dispatch => {
  return {
    logout: () => {
      dispatch(logOutUser())
      // browserHistory.push('/'); // removed to demo logout instant re-render
    },
    login: (user, pw) => {
      dispatch(login(user, pw))
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
