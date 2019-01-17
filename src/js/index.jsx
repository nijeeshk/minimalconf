import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/stylesheets/main.scss';

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
