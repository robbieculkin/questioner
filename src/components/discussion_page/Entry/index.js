import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getCaretCoordinates from 'textarea-caret';
import './index.scss';

const getCaretPosition = () => {
  // Return caret position measured as a character count
  // Return -1 if there is a selection
  const elt = document.getElementById('entryField');
  const start = elt.selectionStart;
  const end = elt.selectionEnd;

  return start === end ? end : -1;
};

const getCaretStyle = unfocused => {
  // visibility hidden if argument provided/falsy
  const caretPosition = getCaretPosition();
  const elt = document.getElementById('entryField');

  if (!unfocused && caretPosition >= 0) {
    const caret = getCaretCoordinates(elt, caretPosition);
    const rect = elt.getBoundingClientRect();

    return {
      top: rect.top + caret.top,
      left: rect.left + caret.left,
      visibility: 'visible'
    };
  } else {
    return {
      visibility: 'hidden'
    };
  }
};

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      caretStyle: {
        visibility: 'hidden'
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.handleBlur();
    setTimeout(this.handleFocus, 100);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleClick() {
    this.setState({ caretStyle: getCaretStyle() });
  }

  handleScroll() {
    this.setState({ caretStyle: getCaretStyle() });
  }

  handleFocus() {
    this.setState({ caretStyle: getCaretStyle() });
  }

  handleBlur() {
    this.setState({ caretStyle: getCaretStyle('unfocused') });
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleKeyDown(event) {
    // Submit textentry when <ENTER> is pressed (instead of newline)
    const { value } = this.state;
    this.setState({ caretStyle: getCaretStyle() });

    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleTextEntry(value);
    }
  }

  handleKeyUp() {
    this.setState({ caretStyle: getCaretStyle() });
  }

  handleTextEntry(value) {
    const { onTextEntry } = this.props;
    if (value === '')
      return;

    onTextEntry(value);
    this.setState({
      value: '',
      caretStyle: getCaretStyle()
    });
  }

  render() {
    const { value, caretStyle } = this.state;

    return (
      <div className='entry'>
        <textarea
          id='entryField'
          type='text'
          autoFocus
          value={value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className='caret' style={caretStyle}></div>
      </div>
    );
  }
}

Entry.propTypes = {
  onTextEntry: PropTypes.func
};

export default Entry;