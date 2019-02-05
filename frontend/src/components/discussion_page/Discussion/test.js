import React from 'react';
import { shallow } from 'enzyme';
import Discussion from '.';

describe('Discussion', () => {
  it('should render correctly', () => {
    const discussionProps = {
      location: {
        state: {
          sessionId: '123uuid',
          selectedPlay: 'Hamlet'
        }
      }
    };
    const component = shallow(<Discussion {...discussionProps} />);
    expect(component).toMatchSnapshot();
  });
});
