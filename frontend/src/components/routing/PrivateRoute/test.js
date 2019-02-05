import React from 'react';
import { shallow } from 'enzyme';
import PrivateRoute from '.';

describe('PrivateRoute', () => {
  it('should render correctly without props', () => {
    const component = shallow(<PrivateRoute />);
    expect(component).toMatchSnapshot();
  });
});
