import React from 'react';
import { shallow, mount } from 'enzyme';
import Entry from '.';

describe('Entry', () => {
  it('should render correctly with no props', () => {
    const component = shallow(<Entry />);
    expect(component).toMatchSnapshot();
  });

  it('should call props fn on button click', () => {
    const onTextEntryFn = jest.fn();
    const component = shallow(<Entry onTextEntry={onTextEntryFn} />);

    component.setState({ value: 'test' });
    component
      .find('button')
      .simulate('click');

    expect(onTextEntryFn).toHaveBeenCalled();
  });

  it('should call props fn on pressing <ENTER>', () => {
    const onTextEntryFn = jest.fn();
    const component = mount(<Entry onTextEntry={onTextEntryFn} />);

    component.setState({ value: 'test' });
    component
      .find('textarea')
      .simulate('keypress', { key: 'Enter' });

    expect(component).toMatchSnapshot();
    expect(onTextEntryFn).toHaveBeenCalled();
    component.unmount();
  });
});
