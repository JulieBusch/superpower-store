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
              <Link className="nav-margins" to="/"><img src="/logo-test.png" /></Link>

              <Link to="/products" className="nav-margins" >Products</Link>
          </div>
          <div className="nav-right">
              <Link to="/cart" className="nav-margins">cart</Link>
              { this.props.currentUser ? this.renderLoggedIn() : this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    )
  }

  renderLoginSignup() {
    return (
      <div>
        <Link to="/signup" className="nav-margins" activeClassName="active">signup</Link>

        <Link to="#" activeClassName="active" className="nav-margins" onClick={this.handleClick}>login</Link>

              {this.state.clicked && <div id="login"><Login /></div>}

      </div>
    )
  }

  renderLoggedIn() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    const userId = this.props.currentUser.id;
    return (
      <div>

        <Link to={`/user/${userId}`} className="nav-margins" activeClassName="active">My Account</Link>

        <button
          className="log-out-btn nav-margins"
          onClick={this.props.logout}>
          logout {name}
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

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logOutUser())
    // browserHistory.push('/'); // removed to demo logout instant re-render
  }
});

export default connect(mapState, mapDispatch)(Navbar)
