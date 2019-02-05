import React from 'react';
import { shallow } from 'enzyme';
import Feed from '.';

describe('Feed', () => {
  it('should render correctly with empty history', () => {
    const feedProps = { history: [] };
    const component = shallow(<Feed {...feedProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should render history correctly', () => {
    const feedProps = {
      history: [
        {
          msgId: 0,
          fromUser: false,
          text: 'Left Text'
        },
        {
          msgId: 1,
          fromUser: true,
          text: 'Right Text'
        }
      ]
    };
    const component = shallow(<Feed {...feedProps} />);
    expect(component).toMatchSnapshot();
  });
});
