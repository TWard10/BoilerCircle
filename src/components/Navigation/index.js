import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthUserContext from '../../AuthUserContext';
import * as routes from '../../constants';
import SignOutButton from '../SignOut';

import './index.css'

const Navigation = ({ authUser }) =>
  <AuthUserContext.Consumer>
    {authUser => authUser
      ? <NavigationAuth />
      : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
    <div className="buttonsGroup">
      <Link to={routes.SIGN_IN}>Sign In</Link>
      <Link to={routes.LANDING}>Landing</Link>
      <Link to={routes.HOME}>Home</Link>
      <Link to={routes.ACCOUNT}>Account</Link>
      <SignOutButton />
    </div>

const NavigationNonAuth = () =>
        <div className="buttonsGroup">
            <Link to={routes.LANDING}>Landing</Link>
            <Link to={routes.SIGN_IN}>Sign In</Link>
        </div>

class NavigationHeader extends Component {
  constructor(props, context){
    super(props, context)
    this.state={
    }
  }

  render() {
    console.log('Navigation Props:', this.props);
    return (
      <div className="navBar">
        <Link to={this.props.authUser ? routes.HOME : routes.LANDING}>
        </Link>
        <div className="searchBar">
          <input type="text" className="searchBarInput" placeholder="Search..."/>
          <span role="img" aria-label="Search" className="searchBarButton">🔍</span>
        </div>
        { this.props.authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(NavigationHeader);