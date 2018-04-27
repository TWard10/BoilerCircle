import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import { WithContext as ReactTags } from 'react-tag-input';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';
import { Paper, TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';


const muiTheme = getMuiTheme({
    "palette": {
          "primary1Color": "#ffeb3b",
          "primary2Color": "#ffeb3b",
          "primary3Color": "#212121",
          "accent1Color": "#fff9c4",
          "accent2Color": "#eceff1",
          "accent3Color": "rgba(255, 255, 255, 0.87)",
          "borderColor": "##ffdc52",
          "canvasColor": "#424242",
          "textColor": "##ffdc52"
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
          height: 650,
          width: 500,
          textAlign: 'center',
          position: "fixed",
            top: "50%",
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
          position: "absolute",
          top: "7%",
          left: "35%",
          overflow:'hidden'

        },
        changepaper: {
          height: 130,
          width: 500,
          textAlign: 'center',
          display: 'inline-block',
          position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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

class PostPage extends Component {
      constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            tags: [],
            displayName: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.mySubmit = this.mySubmit.bind(this);
    }

    componentDidMount(){
        fs.getUser(this.props.authUser.uid).then(doc => {
            this.setState({
                displayName: doc.data().displayName
            })
        })
    }
    handleDelete(i){
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag){
        const { tags } = this.state;
        this.setState({tags: [...tags, ...[tag]]});
    }

    handleDrag(tag, currPos, newPos){
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    mySubmit(){
        if(!this.state.title || !this.state.description || this.state.tags.length < 1){
        alert("You must fill in all fields!")
        }else{
        fs.addPost(this.props.authUser.uid, this.state.displayName, this.state.title, this.state.description, this.state.tags);

        }
    }


    render() {
      const { tags } = this.state;
      return(
          <MuiThemeProvider muiTheme={muiTheme}>
          <div>
          <Paper style={styles.paper} zDepth={5} >


            <div>
          <TextField className = "textbox"
               type="text"
               placeholder="Enter a title for you post..."
               onChange={event => this.setState(byPropKey('title', event.target.value))}
               />
               </div>

          <br/>
          <br/>
          <br/>
          <TextField className = "textbox"
               type="text"
               placeholder="Tell us something about your interest(s)"
               onChange={event => this.setState(byPropKey('description', event.target.value))}
               />

          <br/>
          <br/>
          <br/>
                 <label><strong>Tags</strong></label>
         <br/>
          <br/>


               <ReactTags
                            tags={this.state.tags}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                        />

                        <footer>
                        <RaisedButton
        label="POST"
        style={styles.button}
        backgroundColor = "#424242"
        onClick = {this.mySubmit}
        />
                            </footer>

            </Paper>
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
  )(PostPage);
