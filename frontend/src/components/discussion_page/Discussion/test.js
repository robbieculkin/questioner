import React from 'react';
import { shallow } from 'enzyme';
import Discussion from '.';

jest.mock('uuid', () => jest.fn(() => '123uuid'));

describe('Discussion', () => {
  it('should render correctly', () => {
    const discussionProps = { location: { state: { selectedPlay: 'Hamlet' }}};
    const component = shallow(<Discussion {...discussionProps} />);
    expect(component).toMatchSnapshot();
  });
});
