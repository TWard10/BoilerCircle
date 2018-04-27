import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, fs } from '../../firebase';

import * as routes from '../../constants';

import './index.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';


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
      console.log(email);
      console.log(passwordOne);
      const {
          history,
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            fs.addUser(authUser.uid, username, email);
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.INTER);
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
      const muiTheme = getMuiTheme({
      	"palette": {
              "primary1Color": "#ffeb3b",
              "primary2Color": "#ffeb3b",
              "primary3Color": "#212121",
              "accent1Color": "#fff9c4",
              "accent2Color": "#eceff1",
              "accent3Color": "rgba(255, 255, 255, 0.87)",
              "borderColor": "#ffdc52",
              "canvasColor": "#424242",
              "textColor": "#ffdc52"
          },
          "appBar": {
              "textColor": "#ffdc52",
              "color": "#616161"
          },
          "menuItem": {
              "selectedTextColor": "rgba(0, 0, 0, 0.26)",
              "hoverColor": "#616161",
              "rightIconDesktopFill": "rgba(0, 0, 0, 0.26)"
          }
      });
      const buttonStyle = {
        margin: 12,
      }

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
                  <div className='centerSignUp'>
                  <MuiThemeProvider muiTheme={muiTheme}>
                   <RaisedButton backgroundColor = "#424242" label="Sign Up" style={buttonStyle} onClick={this.onSubmit}/>
                   </MuiThemeProvider>
                   </div>
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
