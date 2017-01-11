import React from 'react'

// import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import {logout as logOutUser} from '../reducers/auth'
import {Link} from 'react-router'
import Login from './Login'

/* -----------------    COMPONENT     ------------------ */

class Navbar extends React.Component {
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
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">

            <Link className="navbar-brand" to="/"><img src="/logo-test.png" /></Link>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/catalog" activeClassName="active">catalog</Link>
              </li>
              <li>
                <Link to="/cart" activeClassName="active">my cart</Link>
              </li>
            </ul>
            { this.props.currentUser ? this.renderLoggedIn() : this.renderLoginSignup() }
          </div>
        </div>
      </nav>
    )
  }

  renderLoginSignup() {
    return (
      <ul className="nav navbar-nav navbar-right login-ul">
        <li>
         <Link to="/signup" activeClassName="active">signup</Link>
        </li>
        <li>
          <Link to="#" activeClassName="active" onClick={this.handleClick}>login</Link>

            {this.state.clicked && <div id="login"><Login /></div>}

        </li>
      </ul>
    )
  }

  renderLoggedIn() {
    const name = this.props.currentUser.name || this.props.currentUser.email;
    const userId = this.props.currentUser.id;
    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to={`/user/${userId}`} activeClassName="active">My Account</Link>
        </li>
        <li>
        <button
          className="navbar-btn btn btn-default"
          onClick={this.props.logout}>
          logout {name}
        </button>
        </li>
      </ul>
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
