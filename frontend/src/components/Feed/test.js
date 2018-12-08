import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Feed from '.';

describe('Projects', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Feed history={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Feed history={[]} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
