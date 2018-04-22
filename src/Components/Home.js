import React, { Component } from 'react';
import './Home.css';
import {Helmet} from 'react-helmet';

class Home extends Component {
  constructor(){
	   super();
     this.state = {
       username: ''
     }
  }
  render(){
    return(
      <div className = 'app'>
        <header className = "app-header">
          <div className="wrapper">
            <h1>BoilerCircle</h1>
          </div>
        </header>
        <div>
          <div className="row">
            <div className="column ">
              <div className = "bigCircle" >
              </div>
              <div>
              <div className = "toptext"> Boiler Link</div>
              <div className = "bodytext"> Our mission is to connect you with <br/>other Boilers you might not have a <br/>chance to otherwise.  Pick your <br/>interests and get connected! </div>
              <button className = "logcircle"><b className = "circletextcd D">Log In</b></button>
              </div>

          </div>
      </div>
      </div>
      </div>
    )
  }

}

export default Home;
