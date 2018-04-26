import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';
import { RaisedButton, Avatar, Paper, FloatingActionButton, List, MenuItem, TextField } from 'material-ui';
import PasswordChangeForm from '../PasswordChange';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Button from 'material-ui/Button';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
//import man from '../../images/man.png'




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
        avatar: false,


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
      avatar: false,
      pass: false


    });
    console.log(this.state.name, " valll")


  }



  onClickPass = () => {
    this.setState({
      pass: !this.state.pass,
      name:false,
      avatar: false

    });
  }

  onClickAvatar=()=>{
    this.setState({
      avatar: !this.state.avatar,
      name: false,
      pass: false

    });

  }

  onClickShut=()=>{
    this.setState({
      avatar: false,
      name: false,
      pass: false

    });
    if (this.state.newDisplayName){
      this.setState({
        displayName: this.state.newDisplayName
      })
    }

  }
 _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

fileChangedHandler = (event) => {
  this.setState({selectedFile: event.target.files[0]})
}


  handleSubmit(){
    console.log(this.props.authUser.uid);
    this.revertToOld(this.state.displayName)
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

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return(
      <MuiThemeProvider muiTheme = {muiTheme}>

      <div className = "pageBackground">

      <Paper style={styles.cpaper} zDepth={5} circle={true} >





          {$imagePreview}



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




      {this.state.avatar ?
      <div className= "email">
      <Paper style={styles.changepaper} zDepth={5} >
      <div>


        <RaisedButton
        label = "Upload an image"
        style={styles.button}
        backgroundColor = "#424242">
          <input style={styles.ImageInput}
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
          {/* <button className="submitButton"
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button> */}
       </RaisedButton>

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
