import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './components/app/App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {setupStore} from './store';

const store = setupStore();
// console.log(typeof setupStore);
// console.log(typeof store);

ReactDOM.render(
  <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
  document.getElementById('root')
);