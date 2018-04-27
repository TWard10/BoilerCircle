import React from 'react'
import { Chip, Avatar, RaisedButton } from 'material-ui';
import theme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import Button from 'material-ui/Button';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../../constants';



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
        },
        "RaisedButton": {
            "textColor": "#ffdc52",
            "labelColor": "#424242",
            "margin": "12",
            "backgroundColor": "ffeb3b"
    },
    "chip": {
                "backgroundColor": "#ffdc52",
                "deleteIconColor": "rgba(0, 0, 0, 0.87)",
                "textColor": "rgba(0, 0, 0, 0.87)"
            },

    });

export default ({picked, intList, removeint, submitInt}) => {
   const hasInts = (picked.length > 0);


    const styles = {
        chip: {
          margin: 4,
        },
        wrapper: {
          display: 'flex',
          flexWrap: 'none',
          //width: 5,
         // opacity: 0.5,
         //visibility: 'hidden',

        },
        button: {
        margin: 12,
        primary1Color: "#424242"
        }
      };

    const idList = picked


    .map( (id) => {

        const interest = intList[id].inter
        //console.log('id for name', id)



          return(



 <MuiThemeProvider muiTheme={muiTheme}>
             <Chip

                onRequestDelete={() => removeint(intList[id])}
                style = {StyleSheet.chip}

                >
                {interest}
             </Chip>
             </MuiThemeProvider>



          )
        }
    )
    return(
        <MuiThemeProvider muiTheme={muiTheme}>
            <div >
                <h3>
                <ul>

                    {idList}

                    </ul>
                    </h3>
                    <h4>

        {hasInts

        ?  <Link to={routes.HOME} style={{textDecoration: 'none'}}><RaisedButton
        label="SUBMIT"
        style={styles.button}
        backgroundColor = "#424242"
        onClick = {() => submitInt()}
        /></Link>

        :  'Click on an Interest to shortlist it...'

        }

      </h4>
            </div>
            </MuiThemeProvider>
    )
}
