import React, { Component } from 'react';
import { RaisedButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { auth } from '../../firebase';
import './index.css'






const muiTheme = getMuiTheme({
    "palette": {
          "primary1Color": "#ffeb3b",
          "primary2Color": "#ffeb3b",
          "primary3Color": "#212121",
          "accent1Color": "#fff9c4",
          "accent2Color": "#eceff1",
          "accent3Color": "rgba(255, 255, 255, 0.87)",
          "borderColor": "#ffeb3b",
          "canvasColor": "#424242",
          "textColor": "#ffeb3b"
      },
      "appBar": {
          "textColor": "#ffdc52",
          "color": "#424242"
      },
      "menuItem": {
          "selectedTextColor": "rgba(0, 0, 0, 0.26)",
          "hoverColor": "#616161",
          "rightIconDesktopFill": "rgba(0, 0, 0, 0.26)"
      }
  });

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  paper: {
    height: 300,
    width: 500,
    textAlign: 'center',
    display: 'inline-block',
    position: "absolute",
    top: "65%",
    left: "35%",
   
  },
  cpaper: {
    height: 512,
    width: 512,
    //marginLeft: 60,
    //paading:60,
    textAlign: "center",
    position: "absolute",
    top: "7%",
    left: "35%",
    overflow:'hidden'
    
    //display: 'inline-block',

  },
  changepaper: {
    height: 130,
    width: 500,
    textAlign: 'center',
    display: 'inline-block',
    position: "absolute",
    top: "45%",
    left: "70%",
    overflow:'hidden'
  },

  ImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  changepasspaper: {
    height: 500,
    width: 500,
    textAlign: 'center',
    display: 'inline-block',
    position: "absolute",
    top: "45%",
    left: "70%",
    overflow:'hidden'
  },
};




const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <MuiThemeProvider muiTheme = {muiTheme}>
      <form onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button className="butt" disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {/* <RaisedButton 
        label = "Reset My Password"
        disabled={isInvalid}
        style = {styles.button}
        backgroundColor = "#424242"
        disabledBackgroundColor = "#696969"
        onClick={this.onSubmit}
        /> */}



        { error && <p>{error.message}</p> }
      </form>
      </MuiThemeProvider >
    );
  }
}

export default PasswordChangeForm;