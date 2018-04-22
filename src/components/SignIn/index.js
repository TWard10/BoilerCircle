import React, { Component } from 'react';
<<<<<<< HEAD
import { compose } from 'recompose'
import logo from '../../logo.svg';
import firebase, { auth, provider } from '../../fire.js';
import './index.css';
import image from'./img.png';

class SignIn extends Component {
  constructor(){
	super();
 	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	this.state = {
		currentItem: '',
		username: '',
		items: [],
		user: null
	}
  }
=======
import { withRouter } from 'react-router-dom';
>>>>>>> 377cbc9ca285f7c96da6a47ea5a5e7e68a98d8fa

import { SignUpLink } from '../SignUp';
import { auth } from '../../firebase';
import * as routes from '../../constants';

const SignInPage = ({ history }) =>
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
