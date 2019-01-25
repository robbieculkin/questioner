import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/fonts.css';
import './css/index.css';
import './css/shared.css';

import Home from './components/Home';
import Discussion from './components/Discussion';
import Report from './components/Report';
import NotFound from './components/NotFound';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/discussion' component={Discussion} />
        <Route path='/report' component={Report} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

// Reload app in-browser without refreshing page
if (module.hot) {
  module.hot.accept();
}
