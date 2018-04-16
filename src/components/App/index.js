import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import SignIn from '../SignIn';
import * as routes from '../../constants'

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
		<div className="app">
			<Switch>
				<Route exact path={routes.SIGN_IN} component={SignIn} />
			</Switch>
			<hr />
		</div>
	</Router>

export default App;