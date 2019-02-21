import React from 'react';
import { shallow } from 'enzyme';
import Home from '.';

jest.mock('uuid', () => jest.fn(() => '123uuid'));

describe('Home', () => {
  it('should render correctly without props', () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
  });
});
