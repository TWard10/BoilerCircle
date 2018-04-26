import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import { WithContext as ReactTags } from 'react-tag-input';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';



const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class FriendsPage extends Component {
      constructor(props){
        super(props)
        this.doSearch = this.doSearch.bind(this)
        this.addFriend = this.addFriend.bind(this)
        this.state = {
            name: '',
            people: [],
            curFriends: []
        }
        
    }

    addFriend(){
        fs.getFriends(this.props.authUser.uid).then(doc => {
            this.setState({
                curFriends: doc.data().friends
            })
        });
    
        var joined = this.state.curFriends.concat(this.state.name);
        this.setState({ curFriends: joined })
        fs.addFriend(this.props.authUser.uid, joined);
    
    }

    doSearch(){
        console.log(this.state.name);
        fs.getPeople(this.state.name).then((querySnapshot) => {
            if (!querySnapshot.empty) {
                 this.setState({
                     messages: []
                 })
     
                 querySnapshot.forEach(data => {
                 var peeps = <button onClick={this.addFriend}>{this.state.people.concat(data.data().displayName)}</button>;
                 this.setState({
                     people: peeps
                 })  
              });
            } 
        });
    }

    render() {
      const { people } = this.state
      return(
        <div>
            <input
                    onChange={event => this.setState(byPropKey('name', event.target.value))}
                    type="text"
                    placeholder="Name"
            />

            <button onClick={this.doSearch}>Search</ button>

            <div>
             {people}
            </div>
        </div>
      );
    }
  }
  
  
  const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser
  });
  
  
  const authCondition = (authUser) => !!authUser;
  
  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(FriendsPage);