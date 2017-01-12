import React from 'react'

// import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {logout as logOutUser} from '../reducers/auth'
import {Link} from 'react-router'
import Login from './Login'

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
      <nav>
        <div className="container">
          <div className="nav-left">
            <div className="navbar-logo">

              <Link className="navbar-brand" to="/"><img src="/logo-test.png" /></Link>
            </div>
            <div>
              <ul>
                <li>
                  <Link to="/products" activeClassName="active">Products</Link>
                </li>
                <li>
                  <Link to="/cart" className="cart-icon"><img src="/cart.png" /></Link>
                </li>
              </ul>
            </div>
          </div>
              { this.props.currentUser ? this.renderLoggedIn() : this.renderLoginSignup() }
        </div>
      </nav>
    )
  }

  renderLoginSignup() {
    return (
      <div className="nav-right">
        <ul className="login-signup">
          <li>
           <Link to="/signup" activeClassName="active">signup</Link>
          </li>
          <li>
            <Link to="#" activeClassName="active" onClick={this.handleClick}>login</Link>

              {this.state.clicked && <div id="login"><Login /></div>}

          </li>
        </ul>
      </div>
    )
  }

  renderLoggedIn() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    const userId = this.props.currentUser.id;
    return (
      <div className="nav-right">
        <ul className="logged-in">
          <li>
            <Link to={`/user/${userId}`} activeClassName="active">My Account</Link>
          </li>
          <li>
          <button
            className="log-out-btn"
            onClick={this.props.logout}>
            logout {name}
          </button>
          </li>
        </ul>
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

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logOutUser())
    // browserHistory.push('/'); // removed to demo logout instant re-render
  }
});

export default connect(mapState, mapDispatch)(Navbar)
