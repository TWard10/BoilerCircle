import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { firebase } from '../../firebase';
//imports
import SignInPage from '../SignIn';
import HomePage from '../Home';
import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import SignUpPage from '../SignUp';
import * as routes from '../../constants';
import withAuthentication from '../../withAuthentication';
//more imports
import './index.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const NoMatch = ({ location }) => (
	<div>
		<h3>
			No match for <code>{location.pathname}</code>
		</h3>
	</div>
);

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			open: false
		}
	}
	render(){
			return(
				<Router>
				    <div>
						<Navigation />

						<hr/><div>
						<MuiThemeProvider muiTheme={getMuiTheme()}>
							 <AppBar
									 title="Boiler Circle"
									 onLeftIconButtonClick={() =>this.setState({open: !this.state.open})}
																/>
							 <Drawer open={this.state.open}
								 docked = {false}
								 onRequestChange={(open)=>this.setState({open})}>
								 <MenuItem>Menu Item</MenuItem>
								 <MenuItem>Menu Item2</MenuItem>
								 </Drawer>
						</MuiThemeProvider>
						</div>
						<Route exact path={routes.LANDING} component={() => <LandingPage />} />
						<Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
						<Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
						<Route exact path={routes.HOME} component={() => <HomePage />} />
					</div>
			    </Router>
				)
	}
}
export default withAuthentication(App);
