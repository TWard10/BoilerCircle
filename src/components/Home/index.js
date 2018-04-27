import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../../withAuthorization';
import { firebase } from '../../firebase';
import './index.css'
import { RaisedButton, Avatar, Paper, FlatButton, List, MenuItem, TextField,Divider } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import man from '../../images/man (1).png';
import { auth, fs } from '../../firebase';

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

  const styles = {
    paper: {
        height: '100%',
        width: 450,
        overflow: 'hidden',
    },
    insidepaper: {
        height: '40%',
        width: "100%",
        overflow: 'hidden',
        textAlign: 'center',
    },
    display: {
      height: "13%",
      width: "100%",
      overflow: 'hidden',
      textAlign: 'center',
    },
    inter: {
      height: "0%",
      width: "100%",
      overflow:'scroll',
    },
    divider: {
      width: "100%",
    },
    smallOne: {
      height: '5%',
      textAlign: 'center',
    }
  }
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      displayName: '',
      interest: [],
    };
  }

  componentDidMount() {
    const { onSetUsers } = this.props;
    fs.getUser(this.props.authUser.uid).then(doc => {
          if(doc.exists){
            this.setState({
              displayName: doc.data().displayName,
              interest: doc.data().interests,
            })
          }
          else{
            this.setState({
              displayName: 'DisplayName'
            })
          }
        })

  }

  render() {

      const { users} = this.state;
        console.log(this.state.interest)
      const interestList = this.state.interest.map((inter)=>{
          return <RaisedButton label={inter} disabled={true} fullWidth={true} disabledBackgroundColor={"#ffdc52"} disabledLabelColor={"#424242"}/>
      })
      console.log(interestList)
    return (
      <MuiThemeProvider muiTheme = {muiTheme}>
      <div className='pageBackground'>
        <div className='row'>
            <div className='column'>
              <Paper style={styles.paper}>
                  <Paper style={styles.insidepaper} zDepth = {0}>
                    <br/>
                    <img className='resize' src={man}/>
                  </Paper>
                    <br/>
                   <Divider inset={true} style={styles.divider}/>
                    <Paper style={styles.display} zDepth = {0}>
                    <h1>{this.state.displayName}</h1>
                    <br/>
                    <Divider inset = {false}/>
                    </Paper>
                    <Paper style={styles.smallOne} zDepth = {0}>
                      <h3>Interests</h3>
                      </Paper>
                    <div className='scroll'>
                      {interestList}
                    </div>
                </Paper>
            </div>
            <div className='column'>
                <h1>Chicken cker</h1>
            </div>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
