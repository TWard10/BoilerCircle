import React, { Component } from 'react';
import { compose } from 'recompose'
import logo from '../../logo.svg';
import firebase, { auth, provider } from '../../fire.js';
import './index.css';

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
    return (
     <div className='app'>
	<header>
      		<div className="wrapper">
        	<h1>BoilerCircle</h1>
		{this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>
		}
      		</div>
	</header>
     </div>
    );
  }
}

export default compose(
)(SignIn);