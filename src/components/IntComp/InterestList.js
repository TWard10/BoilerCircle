import React, { Component } from 'react'
import './interestList.css'
import RB from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


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
        },
        "RaisedButton": {
            "textColor": "#ffdc52",
            "labelColor": "#424242",
            "margin": "12",
    },
    });

export default ({inter, initText, addint, pickedList}) =>{

    const style = {
        margin: 12,
      };

    const interList = inter
    .filter(inter => {
        return pickedList.indexOf(inter.id)===-1 && inter.inter.toLowerCase().indexOf(initText) >= 0
    })
    .map(inter => {

      return(
        <MuiThemeProvider getMuiTheme={getMuiTheme}>



       <RB label={inter.inter}  style={style}
        labelColor = "#ffdc52" backgroundColor = "#424242"

       onClick={() => addint(inter.id)}>



       </RB>

       </MuiThemeProvider>
     )
    });

    return (

    <div>
        <ul>
        {interList}
      </ul>

</div>



    );

     }
