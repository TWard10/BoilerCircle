import  React,{ Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuthUserContext from '../../AuthUserContext';
import { WithContext as ReactTags } from 'react-tag-input';
import withAuthorization from '../../withAuthorization';
import { auth, fs } from '../../firebase';

import './index.css';


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class PostPage extends Component {
      constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            tags: [],
            displayName: ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.mySubmit = this.mySubmit.bind(this);
    }

    componentDidMount(){
        fs.getUser(this.props.authUser.uid).then(doc => {
            this.setState({
                displayName: doc.data().displayName
            })
        })
    }
    handleDelete(i){
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag){
        const { tags } = this.state;
        this.setState({tags: [...tags, ...[tag]]});
    }

    handleDrag(tag, currPos, newPos){
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }
  
    mySubmit(){
        fs.addPost(this.props.authUser.uid, this.state.displayName, this.state.title, this.state.description, this.state.tags);
    }

  
    render() {
      const { tags } = this.state;
      return(
        <div>
            <label><strong>Title</strong></label>
            <input
                    onChange={event => this.setState(byPropKey('title', event.target.value))}
                    type="text"
                    placeholder="Title"
            />

            <label><strong>Description</strong></label>
            <input
                    onChange={event => this.setState(byPropKey('description', event.target.value))}
                    type="text"
                    placeholder="Tell us about your interests"
            />

            <label><strong>Tags</strong></label>
                        <ReactTags
                            tags={this.state.tags}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag} 
                        />

            <button onClick={this.mySubmit}>Submit</button>
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
  )(PostPage);
  