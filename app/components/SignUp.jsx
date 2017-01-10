import React from 'react';
import { connect } from 'react-redux';
import { addNewUser } from '../reducers/user';
import { browserHistory } from 'react-router'

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    return (
      <div className="signin-container">
        <div className="buffer local">
          <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
              <label>name</label>
              <input
                name="name"
                type="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
          </form>
        </div>
        <div className="or buffer">
          <div className="back-line">
            <span>OR</span>
          </div>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/facebook"
              className="btn btn-social btn-facebook">
              <i className="fa fa-facebook" />
              <span>Sign up with Facebook</span>
            </a>
          </p>
        </div>
        <div className="buffer oauth">
          <p>
            <a
              target="_self"
              href="/api/auth/google"
              className="btn btn-social btn-google">
              <i className="fa fa-google" />
              <span>Sign up with Google</span>
            </a>
          </p>
        </div>
      </div>
    );
  }

  onSignupSubmit(event) {
    // const { message } = this.props;
    event.preventDefault();
    const credentials = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    };
    this.props.signup(credentials);
    browserHistory.push('/success')
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = () => {
   return ({})
};

const mapDispatchToProps = { signup: addNewUser };
// // equivalent to:
// const mapDispatch = (dispatch) => {
//   return {
//     signup: function (credentials) {
//       dispatch(signupAndGoToUser(credentials));
//     }
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
