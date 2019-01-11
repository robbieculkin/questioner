import React, { Component } from 'react';
import './index.scss';

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyPress(event) {
    const { value } = this.state;

    if (event.key === 'Enter') {
      this.handleTextEntry(value);
    }
  }

  handleTextEntry(value) {
    const { onTextEntry } = this.props;

    onTextEntry(value);
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;

    return (
      <div className='entry'>
        <input
          id='entryField'
          type='text'
          value={value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
        <button onClick={() => this.handleTextEntry(value)}> Submit </button>
      </div>
    );
  }
}

export default Entry;