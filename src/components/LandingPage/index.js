import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as routes from '../../constants';

export default class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  handleLanding = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.LANDING);
  }
  handleSign = () =>{
    const {
        history,
    } = this.props;
    history.push(routes.SIGN_IN);
  }
    render(){
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

      const style = {
        height: 400,
        width: 400,
        margin: 50,
        padding: 60,
        textAlign: 'center',
        display: 'inline-block'
      };
      const buttonStyle = {
        margin: 12,
      }
      return(
        <MuiThemeProvider muiTheme={muiTheme}>
           <AppBar
               title="Boiler Circle"
               onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
                            />
           <Drawer open={this.state.open}
             docked = {false}
             onRequestChange={(open)=>this.setState({open})}>
             <MenuItem onClick = {this.handleLading}>Landing</MenuItem>
             <MenuItem onClick = {this.handleSign}>Sign In</MenuItem>
             </Drawer>

                <div className='container'>
                <Paper backgroundColor = "#424242" style={style} zDepth={3} circle={true} className='styles-overriding-css-example'>
                  <h1>Boiler Circle</h1>
                  <b>Welcome to Boiler Circle. Our goal is to get you connected to fellow boilers who share common interests.  Select your hobbies and get connected!</b>
                </Paper>
                </div>
                <div className='container'>
                  <RaisedButton backgroundColor = "#424242" label="Sign In" style={buttonStyle} />
                  <RaisedButton backgroundColor = "#424242" label="Support" style={buttonStyle} />
                  </div>
        </MuiThemeProvider>


      )
    }
}
