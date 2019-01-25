import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Report from '.';

describe('Report', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Report />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Report />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
