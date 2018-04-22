import React, { Component } from 'react';
import { compose } from 'recompose'
import logo from '../../logo.svg';
import firebase, { auth, provider } from '../../fire.js';
import './index.css';
import image from'./img.png';

class SignIn extends Component {
  constructor(){
	super();
 	this.login = this.login.bind(this);
	this.logout = this.logout.bind(this);
	this.state = {
		currentItem: '',
		username: '',
		items: [],
		user: null
	}
  }

  componentDidMount(){
	auth.onAuthStateChanged((user) => {
		if(user){
			this.setState({ user });
		}
	});
  }

  handleChange(e){

  }

  logout(){
	auth.signOut()
	  .then(() => {
		this.setState({
			user: null
		});
	     });
  }

  login(){
	auth.signInWithPopup(provider)
	  .then((result) => {
		const user = result.user;
		this.setState({
		  user
		});
	      });
  }

  render() {
      console.log("image", image);
    return (
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

              </div>
                <div>
                <div className = "toptext"> Boiler Link</div>
                <div className = "bodytext"> Our mission is to connect you with <br/>other Boilers you might not have a <br/>chance to otherwise.  Pick your <br/>interests and get connected! </div>
                {this.state.user ? <button className = "logcircle" onClick={this.logout}><b className = "circletextcd D">Log Out</b></button> : <button className = "logcircle" onClick={this.login}><b className = "circletextcd D">Log In</b></button>
            		}

            </div>
            <div className= 'image' > <img src={image} alt="BoilerMaker" /> </div>
        </div>
        </div>
        </div>
    );
  }
}

export default compose(
)(SignIn);
