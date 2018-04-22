import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthUserContext from '../../AuthUserContext';
import * as routes from '../../constants';
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <ul>
        <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        <li><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.HOME}>Home</Link></li>
        <li><SignOutButton /></li>
    </ul>

const NavigationNonAuth = () =>
        <ul>
            <li><Link to={routes.LANDING}>Landing</Link></li>
            <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
        </ ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);