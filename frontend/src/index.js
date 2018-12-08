import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './css/fonts.css';
import './css/index.css';
import './css/shared.css';
import Home from './components/Home';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <Home />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

// Reload app in-browser without refreshing page
if (module.hot) {
  module.hot.accept();
}
