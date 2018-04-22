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

const NoMatch = ({ location }) => (
	<div>
		<h3>
			No match for <code>{location.pathname}</code>
		</h3>
	</div>
);

const App = () =>
	<Router>
	    <div>
			<Navigation />

			<hr/>

			<Route exact path={routes.LANDING} component={() => <LandingPage />} />
			<Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
			<Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
			<Route exact path={routes.HOME} component={() => <HomePage />} />
		</div>
    </Router>
export default withAuthentication(App);
