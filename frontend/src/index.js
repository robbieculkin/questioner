import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './style/fonts.scss';
import './style/index.scss';
import './style/shared.scss';

import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/welcome_page/Home';
import Discussion from './components/discussion_page/Discussion';
import Report from './components/report_page/Report';
import NotFound from './components/error_page/NotFound';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/discussion' component={Discussion} />
        <PrivateRoute path='/report' component={Report} />
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
