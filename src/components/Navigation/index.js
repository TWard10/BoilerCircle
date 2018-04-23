import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthUserContext from '../../AuthUserContext';
import * as routes from '../../constants';
import SignOutButton from '../SignOut';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

this.state = ({open: false});
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
        "textColor": "#ffeb3b",
        "color": "#616161"
    },
    "menuItem": {
        "selectedTextColor": "rgba(0, 0, 0, 0.26)",
        "hoverColor": "#616161",
        "rightIconDesktopFill": "rgba(0, 0, 0, 0.26)"
    }
});
const Navigation = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

  const handleLanding = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.LANDING);
  }
  const handleSign = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.SIGN_IN);
  }
  const handleHome = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.HOME);
  }
  const handleAccount = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.ACCOUNT);
  }

const NavigationAuth = () =>

    <MuiThemeProvider muiTheme={muiTheme}>
      <AppBar
          title="Boiler Circle"
          onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
                        />
      <Drawer open={this.state.open}
        docked = {false}
        onRequestChange={(open)=>this.setState({open})}>
        <MenuItem onClick = {this.handleLanding}>Landing</MenuItem>
        <MenuItem onClick = {this.handleSign}>Sign In</MenuItem>
        <MenuItem onClick = {this.handleHome}>Home</MenuItem>
        <MenuItem onClick = {this.handleAccount}>Account</MenuItem>
        </Drawer>
        </MuiThemeProvider>


const NavigationNonAuth = () =>
<MuiThemeProvider muiTheme={muiTheme}>
  <AppBar
      title="Boiler Circle"
      onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
   />
  <Drawer open={this.state.open}
      docked = {false}
      onRequestChange={(open)=>this.setState({open})}>
      <MenuItem onClick = {this.handleLanding}>Landing</MenuItem>
      <MenuItem onClick = {this.handleSign}>Sign In</MenuItem>
  </Drawer>
</MuiThemeProvider>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
