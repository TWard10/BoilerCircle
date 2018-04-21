import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Home from './Components/Home.js'
ReactDOM.render((
  <div>
      <Router>
      <Switch>

          <Route exact path="/" component={App} />
          <Route path="/user" component={Home} />

      </Switch>
      </Router>
      </div>),
document.getElementById('root'));
registerServiceWorker();
