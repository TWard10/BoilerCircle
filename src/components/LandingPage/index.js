import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as routes from '../../constants';
import './landing.css';

class LandingPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }


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

      const style = {
        height: 550,
        width: 550,
        // margin: 50,
        // padding: 60,
         textAlign: 'justify',
        display: 'inline-block',
        position: "fixed",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow:'hidden'
      };
      const buttonStyle = {
        margin: 12,
      }
      return(
        <div className="pageBackground">
          <MuiThemeProvider muiTheme={muiTheme}>

                  <div className='center'>
                  <Paper backgroundColor = "#424242" style={style} zDepth={3} circle={true}>
                    <h1 className = 'h1'>Boiler Circle</h1>
                    <br/>
                    <br/>
                    <b className = 'h2' >Welcome to Boiler Circle. Our goal is to get you connected to fellow boilers who share common interests.  Select your hobbies and get connected!</b>
                  </Paper>
                  </div>
                  <div className = 'buttons'>
                  <div className='container'>
                    <RaisedButton  labelColor = "#ffdc52" backgroundColor = "#424242" label="Sign In" onClick={this.handleSign} style={buttonStyle} />
                    <RaisedButton labelColor = "#ffdc52" backgroundColor = "#424242" label="Support" style={buttonStyle} />
                    </div>
                    </div>
          </MuiThemeProvider>

        </div>

      )
    }
}

export default withRouter(LandingPage);

export {
  LandingPage,
};
