import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import store from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import inter from './components/Interests/ints'

ReactDOM.render(
    <Provider store={store}>
      <App  inter = {inter}/>
    </Provider>,
    document.getElementById('root')
  );

registerServiceWorker();
