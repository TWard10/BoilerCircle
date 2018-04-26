import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class AccountPage extends Component {
    constructor(props){
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        photoURL: '',
        displayName: '',
      }
  }

  handleSubmit(){
    console.log(this.props.authUser.uid);
    fs.updateUserInfo(this.props.authUser.uid, this.state.displayName, this.state.photoURL)
  }

  render() {
    const {
      email,
      displayName
    } = this.state;
    return(
      <div>
        <input
                  onChange={event => this.setState(byPropKey('displayName', event.target.value))}
                  type="text"
                  placeholder="Display Name"
        />

        <input
                  onChange={event => this.setState(byPropKey('photoURL', event.target.value))}
                  type="text"
                  placeholder="Photo"
        />       
        <button onClick={this.handleSubmit}>Submit</ button>
        <br />
        <br />
        <PasswordForgetForm />
        <PasswordChangeForm />

        
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});


const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
