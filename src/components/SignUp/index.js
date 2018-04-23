import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../../firebase';

import * as routes from '../../constants';

import './index.css';

const SignUpPage = ({ history }) =>
  <div className="signUpPageBackground">
    <SignUpForm history={history}/>
  </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
        username,
        email,
        passwordOne,
      } = this.state;

      const {
          history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            db.doCreateUser(authUser.uid, username, email)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }));
              history.push(routes.HOME);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });

      event.preventDefault();
  }

  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="signUpBackground">
        <h1 className="signUpHeader">SIGN UP</h1>
          <form onSubmit={this.onSubmit}>
               <div className="signUpInfo">
                  <input
                  className="textBoxReg"
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  type="text"
                  placeholder="Full Name"
                  />
                  <input
                  className="textBoxReg"
                  value={email}
                  onChange={event => this.setState(byPropKey('email', event.target.value))}
                  type="text"
                  placeholder="Email Address"
                  />
                  <input
                  className="textBoxReg"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                  />
                  <input
                  className="textBoxReg"
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  type="password"
                  placeholder="Confirm Password"
                  />
              </div>
              <div className="centerSignUp">
                  <button className="signUpButton" disabled={isInvalid} type="submit">
                  Sign Up
                  </button>
              </div>
                { error && <p>{error.message}</p> }
          </form>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
