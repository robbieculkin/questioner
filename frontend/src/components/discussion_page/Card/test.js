import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

describe('Card', () => {
  it('should render correctly without props', () => {
    const component = shallow(<Card />);
    expect(component).toMatchSnapshot();
  });
});
