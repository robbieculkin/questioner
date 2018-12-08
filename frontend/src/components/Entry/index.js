import React, { Component } from 'react';
import './index.scss';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'Enter text here...'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    const { onTextEntry } = this.props;

    return (
      <div className='entry'>
        <input
          type='text'
          onChange={this.handleChange}
          placeholder={value}
        />
        <button onClick={() => onTextEntry(value)}> Submit </button>
      </div>
    );
  }
}

export default Entry;