import React, {Component} from 'react'
import SearchField from './SearchField'
import TextField from 'material-ui/TextField';
import Typo from 'material-ui/Typography'
//import theme from 'material-ui/styles/getMuiTheme'
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Search extends Component{


    constructor(props){
        super(props)
    
        this.state = {
          refval: '',
        };
      }

    update(){
        const val = this.refval.value;
        this.props.update(val);
    }
    render() {
       // console.log('init text', this.props.initText);
       console.log("refval is", this.refval)
       
       return(

         
        <header>
            <TextField 
            
            label="Search here...."
                
                type="text"
                //ref={ (value) => {this.refval = value}}
                placeholder="Type to filter..." 
                inputRef={ (value) => {this.refval = value}}
                onChange = {this.update.bind(this)}
                >
                
               
              
            </TextField>
            </header>
           
           
        )
    }
}

export default Search