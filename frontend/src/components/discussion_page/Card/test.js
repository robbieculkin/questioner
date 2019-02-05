import React from 'react';
import { shallow } from 'enzyme';
import Card from '.';

describe('Card', () => {
  it('should render correctly without props', () => {
    const cardProps = { history: [{ text: 'Text Here' }] };
    const component = shallow(<Card {...cardProps} />);
    expect(component).toMatchSnapshot();
  });
});
