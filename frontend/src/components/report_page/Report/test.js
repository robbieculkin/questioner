import React from 'react';
import { shallow } from 'enzyme';
import Report from '.';

describe('Report', () => {
  it('should render correctly', () => {
    const reportProps = { location: { state: { sessionId: '123uuid' }}};
    const component = shallow(<Report {...reportProps} />);
    expect(component).toMatchSnapshot();
  });
});
