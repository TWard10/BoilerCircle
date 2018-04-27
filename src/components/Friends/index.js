import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import { WithContext as ReactTags } from 'react-tag-input';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';
import './index.css';
import { RaisedButton, Avatar, Paper, FloatingActionButton, List, MenuItem, TextField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
  const styles ={
  paper: {
    height: 100,
    width: 400,
    textAlign: 'center',

    // display: 'inline-block',
    // position: "absolute",
    // top: "65%",
    // left: "35%",

    display: 'inline-block',
    position: "fixed",
      top: "30%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow:'hidden'
  },
  respaper: {
    height: 400,
    width: 400,
    textAlign: 'center',

    // display: 'inline-block',
    // position: "absolute",
    // top: "65%",
    // left: "35%",

    display: 'inline-block',
    position: "fixed",
      top: "56%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow:'hidden'
  }
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class FriendsPage extends Component {
      constructor(props){
        super(props)
        this.doSearch = this.doSearch.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.state = {
            name: '',
            people: [],
            curFriends: [],
            showPaper: false
        }

    }

    addFriend(){
        var hasFriend = false;
        var holdName = this.state.name;
        var holdAr = this.state.curFriends;
        holdAr.forEach(function (friend) {
            console.log(friend + " ::: " + holdName)
            if(friend === holdName){
                hasFriend = true;
            }
        });

        if(hasFriend == true){
            alert("You are already following this user");
        }else{
            var joined = this.state.curFriends.concat(this.state.name);
            this.setState({ curFriends: joined })
            fs.addFriend(this.props.authUser.uid, joined);
            alert("You are now following: " + this.state.name);
        }
    }

    doSearch(){
        console.log(this.state.name);
        this.setState({showPaper: true})
        console.log(this.state.showPaper)
        fs.getPeople(this.state.name).then((querySnapshot) => {
            if (!querySnapshot.empty) {
                 this.setState({
                     people: []
                 })

                 querySnapshot.forEach(data => {
                 var peeps =
                 <RaisedButton
                   label={data.data().displayName}
                     style={styles.button}
                     backgroundColor = "#ffdc52"
                     labelColor = "#424242"
                     onClick = {this.addFriend}
                     />;
                 var joined = this.state.people.concat(peeps);
                 this.setState({
                     people: joined
                 })
              });
            }
        });
    }

    render() {
       fs.getUser(this.props.authUser.uid).then(doc => {
            this.setState({
                curFriends: doc.data().friends
            })
        });
      const { people, showPaper } = this.state
      
      return(
        <MuiThemeProvider muiTheme={muiTheme}>
        <div className = 'pageBackground'>
          <div>
          <Paper style = {styles.paper}>
          <div>
            <TextField
                    onChange={event => this.setState(byPropKey('name', event.target.value))}
                    type="text"
                    placeholder="Search Name"
            />
            </div>
            <div>
            <RaisedButton
              label="SUBMIT"
                style={styles.button}
                backgroundColor = "#424242"
                onClick = {this.doSearch}
                />
            </div>
            </Paper>
            <div>
            {showPaper?
             <Paper style={styles.respaper}>
              <h1> People </h1>
                {people}
             </Paper>:
             console.log()}
            </div>
            </div>
        </div>
        </MuiThemeProvider>
      );
    }
  }


  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
  });


  const authCondition = (authUser) => !!authUser;

  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(FriendsPage);
