import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';
import { RaisedButton, Avatar, Paper, FloatingActionButton, List, MenuItem, TextField } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//import man from '../../images/man.png'
//import FileUploader from 'react-firebase-file-uploader';
import PasswordChangeForm from '../PasswordChange'
import FileUploader from 'react-firebase-file-uploader';
import firebase from 'firebase';





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

    // display: 'inline-block',
    // position: "absolute",
    // top: "65%",
    // left: "35%",

    display: 'inline-block',
    position: "fixed",
      top: "80%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      overflow:'hidden'
   
   


  },
  cpaper: {
    height: 512,
    width: 512,
    //marginLeft: 60,
    //paading:60,


    textAlign: "center",

    // position: "absolute",
    // top: "7%",
    // left: "35%",
    // overflow:'hidden'


    display: 'inline-block',
    position: "fixed",
      top: "35%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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

class AccountPage extends Component {

    constructor(props){
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this);
      //his.fileChangedHandler = this.fileChangedHandler.bind(this);
      //this.uploadHandler = this.uploadHandler.bind(this); 

      this.state = {
        photoURL: '',
        displayName: '',
        newDisplayName: '', 
        file: '',
        imagePreviewUrl: '',
        email: '', 
        pass: false,
        name: false, 
        avatarBol: false,  
        isUploading: false,
        progress: 0,
        avatar: '',
        avatarURL: ''

        //module: null
      }
  }

  componentDidMount(){
        fs.getUser(this.props.authUser.uid).then(doc => {
          if(doc.exists){
            this.setState({
              displayName: doc.data().displayName,
              email: doc.data().email
            })
          }
          else{
            this.setState({
              displayName: 'DisplayName'
            })
          }
        })

      }


  state = {selectedFile: null}

  onClickName = () =>{
    this.setState({
      
      name: !this.state.name,
      avatarBol: false,
      pass: false


    });
    console.log(this.state.name, " valll")
   }
    
   handleChangeUsername = (event) => this.setState({username: event.target.value});
   handleUploadStart = () => this.setState({isUploading: true, progress: 0});
   handleProgress = (progress) => this.setState({progress});
   handleUploadError = (error) => {
   this.setState({isUploading: false});
   console.error(error);
   }
   handleUploadSuccess = (filename) => {
   this.setState({avatar: filename, progress: 100, isUploading: false});
   firebase.storage().ref('images').child(filename).getDownloadURL().then(url => {
     this.setState({avatarURL: url})
     fs.updatePhoto(this.props.authUser.uid, url);
   });
   };

  onClickPass = () => {
    this.setState({
      pass: !this.state.pass,
      name:false,
      avatarBol: false

    });
  }

  onClickAvatar=()=>{
    this.setState({
      avatarBol: !this.state.avatarBol,
      name: false,
      pass: false

    });

  }

  onClickShut=()=>{
    this.setState({
      avatarBol: false,
      name: false,
      pass: false

    });
    if (this.state.newDisplayName){
      this.setState({
        displayName: this.state.newDisplayName
      })
      fs.updateUsername(this.props.authUser.uid, this.state.newDisplayName);
    }

    if(this.state.avatarURL){
      fs.updatePhoto(this.props.authUser.uid, this.state.avatarURL);
    }

  }


 _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }


fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}


  handleSubmit(){
    console.log(this.props.authUser.uid);
    fs.updateUserInfo(this.props.authUser.uid, this.state.displayName, this.state.photoURL)
  }

  render() {
    const {
      email,
      displayName,
      photoURL,
      newDisplayName, 

    } = this.state;
    let src = '../../images/' + photoURL; 

    let {avatarURL} = this.state;
    let avURL = null;
    if (avatarURL) {
      avURL = (<img src={this.state.avatarURL} />);
      console.log("ig url", this.state.avatarURL)
    } else {
      fs.getUser(this.props.authUser.uid).then(doc => {
        this.setState({
          avatarURL: doc.data().photoURL
        })
      })
      avURL = (<img src={this.state.avatarURL} />);
      console.log("else url")
    }

    return(
      <MuiThemeProvider muiTheme = {muiTheme}>

      <div className = "pageBackground">

      <Paper style={styles.cpaper} zDepth={5} circle={true} >

      
      
      
      
          {avURL}
       
         

      </Paper>

      


      {this.state.name ?
      <div className= "email">
      <Paper style={styles.changepaper} zDepth={5} >
      <div>
          <TextField className = "textbox"
               type="text"
               placeholder={displayName}
               value = {newDisplayName}
               onChange={event => this.setState(byPropKey('newDisplayName', event.target.value))
            }  
               />
               </div>
               
               <RaisedButton 
        label="SUBMIT" 
        style={styles.button} 
        backgroundColor = "#424242"
        onClick = {this.onClickShut}
        />
             
         
      </Paper>
       </div>
      : console.log('else')

      }




      {this.state.avatarBol ?
      <div className= "email">
      <Paper style={styles.changepaper} zDepth={5} >
      <div>
      
        
      {/*  <RaisedButton 
        label = "Upload an image"
        style={styles.button} 
        backgroundColor = "#424242">
          <input style={styles.ImageInput}
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          {/* <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button> }
       </RaisedButton> */}

       <FileUploader
          accept="image/*"
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
       />
          
               </div>
               
               <RaisedButton 
        label="SUBMIT" 
        style={styles.button} 
        backgroundColor = "#424242"
        onClick = {this.onClickShut}
        />
             
         
      </Paper>
       </div>
      : console.log('else')

      }





      {this.state.pass ?
      <div className= "email">
      <Paper style={styles.changepasspaper} zDepth={5}  >
      <div>
      <PasswordChangeForm/>
        </div>
        
               
               <RaisedButton 
        label="SUBMIT" 
        style={styles.button} 
        backgroundColor = "#424242"
        onClick = {this.onClickShut}
        />
             
         
      </Paper>
       </div>
      : console.log('else')

      }





     

      <Paper style={styles.paper} zDepth={5}>

      <h4> Display Name: <RaisedButton label = {displayName} backgroundColor = "#424242" primary1Color = "#424242" /> </h4>
      <h4> Email Address: {email}</h4>
      
      <footer>
        <List>
        <MenuItem onClick={this.onClickName}> Change Display Name </MenuItem>
        <MenuItem onClick={this.onClickAvatar}> Change Avatar </MenuItem>
        <MenuItem onClick={this.onClickPass}> Change Password </MenuItem>
      </List>
        </footer>

      </Paper>

      </div>

       
      
      
      </MuiThemeProvider>
     
    );
  }
}


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});


const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
