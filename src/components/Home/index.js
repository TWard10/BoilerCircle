import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../../withAuthorization';
import firebase from 'firebase';
import './index.css'
import { RaisedButton, Avatar, Paper, FlatButton, MenuItem, TextField,Divider, List, ListItem, Subheader  } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import man from '../../images/man (1).png';
import { auth, fs } from '../../firebase';
import { transparent } from 'material-ui/styles/colors';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';
import { fullWhite } from 'material-ui/styles/colors';

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
      },
  "listitem":{
    "secondaryTextColor": "#ff5722",
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
    },

    filler: {
      height: '80%',
      width: 1200,
      position: "fixed",
      top: "50%",
      left: "60%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",

      //display: 'in-line block',
     overflow: "hidden",
    },
  }
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.getAllPosts = this.getAllPosts.bind(this)
    this.makepost = this.makepost.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.getImage = this.getImage.bind(this);
    this.clear = this.clear.bind(this);
    this.state = {
      users: null,
      displayName: '',
      interest: [],
      avatarURL: '',
      posts: [], 
      following: [],
      postImage: ''
    };
    
  }

  componentWillMount() {
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

    fs.getUser(this.props.authUser.uid).then(doc => {
          if(doc.exists){
            this.setState({
              following: doc.data().friends
            })
          }
        })

  }

  getImage(image){
    firebase.storage().ref().child(image).getDownloadURL().then((url) => {
      this.setState({
        postImage: url
      })
    })
  }

  clear(){
    this.setState({
      posts:[]
    })
  }

  getAllPosts() {
    console.log("check");
    var dbPromises = [];
    var holdInterest = this.state.interest;
    var holdFriends = this.state.following;

    this.clear();

   for(var i = 0; i < holdInterest.length; i++){
      for(var j = 0; j < holdFriends.length; j++){
        console.log(holdFriends[j] + " ::: " + holdInterest[i])
          fs.getQueryPost()
            .where('displayName', '==', holdFriends[j])
            .where('tags', '==', holdInterest[i])
            .get()
            .then(doc => {
                doc.forEach((mydoc) => {
                  this.makepost(mydoc.data().tags, mydoc.data().displayName, mydoc.data().title, mydoc.data().description, mydoc.data().photoURL)
                })
            })
      }
    }

    dbPromises.forEach((doc) => {
      doc.get().then(doc => {
        console.log(doc.title);
      })
    })

    
  }

  filterSearch(item){
    console.log("check");
    var dbPromises = [];
    var holdInterest = this.state.interest;
    var holdFriends = this.state.following;

    this.clear();
      for(var j = 0; j < holdFriends.length; j++){
          fs.getQueryPost()
            .where('displayName', '==', holdFriends[j])
            .where('tags', '==', item)
            .get()
            .then(doc => {
                doc.forEach((mydoc) => {
                  this.makepost(mydoc.data().tags, mydoc.data().displayName, mydoc.data().title, mydoc.data().description, mydoc.data().photoURL)
                })
            })
    }

    dbPromises.forEach((doc) => {
      doc.get().then(doc => {
        console.log(doc.title);
      })
    })
  }

  makepost(tag, user, title, disc, photo){
    //this.getImage(photo);l
    const hold = <div>
         <ListItem
          leftAvatar = {<img className="resizePic" src={photo} />}
          /* leftAvatar = {<RaisedButton label={tag} disabled={true} disabledBackgroundColor="#ffdc52" disabledLabelColor="#424242" />} */
          rightAvatar = {<RaisedButton label={tag} disabled={true} disabledBackgroundColor="#ffdc52" disabledLabelColor="#424242" />} 
              
          primaryText={
                  <p>{user}</p>
      
                }
    
              secondaryText={
                
          <p><span style={{color: white}}>
                  {disc}
             </span> </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset={true} />
      </div> ;
   

  //const newArr = this.state.posts.concat(hold);
  console.log(this.state.posts);
  this.setState({
    posts: this.state.posts.concat(hold)
  });
    
  }

  render() {
    console.log('posts', this.state.posts)

      const { users} = this.state;
      let {avatarURL} = this.state;
      let avURL = null;
      if(avatarURL){
        avURL = (<img className='resize' src={this.state.avatarURL} />)
      }else{
        fs.getUser(this.props.authUser.uid).then(doc => {
          
            this.setState({
              avatarURL: doc.data().photoURL
            })

        })
        avURL = this.state.avatarURL;
      }
      const allPosts = this.state.posts.map((item) => {
        return item;
      })
      const interestList = this.state.interest.map((inter)=>{
          return <RaisedButton onClick={e => this.filterSearch(inter)} className="padded" label={inter} value={inter} fullWidth={true} backgroundColor={"#ffdc52"} labelColor={"#424242"} label={inter} labelColor={"#424242"}/>
      })

  
    return (
      <MuiThemeProvider muiTheme = {muiTheme}>
     
      <div className='pageBackground'>
        <div className='row'>
            <div className='column'>
              <Paper style={styles.paper}>
                  <Paper style={styles.insidepaper} zDepth = {0}>
                    <br/>
                    <img className='resize' src={this.state.avatarURL}></img>
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
                      <RaisedButton onClick={this.getAllPosts} className="padded" label={"Get all posts"} fullWidth={true} backgroundColor={"#ffdc52"} labelColor={"#424242"} labelColor={"#424242"}/>
                      {interestList}
                    </div>
                </Paper>
            </div>
            <div>
               <Paper style={styles.filler}>
               
             
               <div className="scroll">
               <List>
              {allPosts}
              </List>
              
                 </div>

               </Paper>
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
