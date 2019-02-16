import React from 'react';
import { shallow } from 'enzyme';
import Feed from '.';

describe('Feed', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<Feed />);
    expect(component).toMatchSnapshot();
  });

  it('should render history correctly', () => {
    const feedProps = {
      history: [
        {
          msgId: '123uuid',
          fromUser: false,
          text: 'Left Text'
        },
        {
          msgId: '223uuid',
          fromUser: true,
          text: 'Right Text'
        }
      ]
    };
    const component = shallow(<Feed {...feedProps} />);
    expect(component).toMatchSnapshot();
  });
});
