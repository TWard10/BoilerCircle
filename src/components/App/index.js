import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { firebase } from '../../firebase';
//imports
import SignInPage from '../SignIn';
import HomePage from '../Home';
import Navigation from '../Navigation';
import LandingPage from '../LandingPage';
import SignUpPage from '../SignUp';
import PostPage from '../CreatePost';
import FriendsPage from '../Friends';
import AccountPage from '../Account';
import PasswordForgetPage from '../PasswordForget';
import * as routes from '../../constants';
import withAuthentication from '../../withAuthentication';
import InterPage from '../IntComp';
//import inter from '../Interests/ints'

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

			<Switch>
				<Route exact path={routes.LANDING} component={() => <LandingPage />} />
				<Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
				<Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
				<Route exact path={routes.POST_PAGE} component={() => <PostPage />} />
				<Route exact path={routes.FRIENDS} component={() => <FriendsPage />} />
				<Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
				<Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
				<Route exact path={routes.HOME} component={() => <HomePage />} />
				<Route exact path={routes.INTER} component={() => <InterPage  />}  />
				<Route path="*" component={() => <LandingPage />} />
			</Switch>
		</div>
    </Router>
export default withAuthentication(App);
