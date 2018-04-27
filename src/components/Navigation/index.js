import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthUserContext from '../../AuthUserContext';
import * as routes from '../../constants';
import SignOutButton from '../SignOut';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { auth } from '../../firebase';
import FlatButton from 'material-ui/FlatButton';

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
        "color": "#424242"
    },
    "menuItem": {
        "selectedTextColor": "rgba(0, 0, 0, 0.26)",
        "hoverColor": "#616161",
        "rightIconDesktopFill": "rgba(0, 0, 0, 0.26)"
    }
});

class NavigationHeader extends Component {
  constructor(props, context){
    super(props, context)
    this.state={
      open: false
    }
  }

  NavigationAuth = (open) =>
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar
        title="Boiler Circle"
        onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
        iconElementRight={<FlatButton label="Sign Out" onClick={auth.doSignOut}/>}
                      />
    <Drawer open={this.state.open}
      docked = {false}
      onRequestChange={(open)=>this.setState({open})}>
      <Link to={routes.LANDING}  style={{ textDecoration: 'none' }}><MenuItem>Landing</MenuItem></Link>
      <Link to={routes.HOME}  style={{ textDecoration: 'none' }}><MenuItem>Home</MenuItem></Link>
      <Link to={routes.ACCOUNT}  style={{ textDecoration: 'none' }}><MenuItem>Account</MenuItem></Link>
      <Link to={routes.POST_PAGE}  style={{ textDecoration: 'none' }}><MenuItem>Create A Post</MenuItem></Link>
      </Drawer>
      </MuiThemeProvider>



  NavigationNonAuth = () =>
  <MuiThemeProvider muiTheme={muiTheme}>
  <AppBar
    title="Boiler Circle"
    onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
  />
  <Drawer open={this.state.open}
    docked = {false}
    onRequestChange={(open)=>this.setState({open})}>
    <Link to={routes.LANDING}  style={{ textDecoration: 'none' }}><MenuItem>Landing</MenuItem></Link>
    <Link to={routes.SIGN_IN}  style={{ textDecoration: 'none' }}><MenuItem>Sign In</MenuItem></Link>
  </Drawer>
  </MuiThemeProvider>

  render() {
    console.log('Navigation Props:', this.props);
    return (
      <div>
        { this.props.authUser ? this.NavigationAuth() : this.NavigationNonAuth() }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(NavigationHeader);
