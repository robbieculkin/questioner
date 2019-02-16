import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Protect Route from being explicitly accessed without
// providing the necessary state through an internal <Link />
const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route {...rest} render={
    props => (
      props.location.state
        ? <Component {...props} />
        : <Redirect to='/' />
    )}
  />

export default PrivateRoute;
