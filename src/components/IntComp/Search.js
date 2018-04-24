import React, {Component} from 'react'
//import SearchField from './SearchField'
import TextField from 'material-ui/TextField';
//import Typo from 'material-ui/Typography'
import theme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'

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

class Search extends Component{

   


    constructor(props){
        super(props)
        this.update = this.update.bind(this)
      
        this.state = {
          refval: 'X',
        };
      }

   

    update(event){
        this.setState({
            refval: event.target.value
        })
        console.log("refval is", this.state.refval)
          this.props.update(event.target.value);
    }

    render() {
       // console.log('init text', this.props.initText);
       
       
       return(

        <MuiThemeProvider muiTheme={muiTheme}>
         <header >
            <TextField
            
            label="Search here...."
               
                type="text"
                //ref={ (value) => {this.refval = value}}
                placeholder="Type to filter..." 
                // inputRef={ (value) => this.setState({
                //     refval: value
                // })  }
                onChange = {this.update}
                >
                
               
              
            </TextField>
           </header>
            </MuiThemeProvider>
           
           
        )
    }
}

export default Search