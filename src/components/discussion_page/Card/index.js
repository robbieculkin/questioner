import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Entry from '../Entry';

const process_html = text => {
  if (!text.includes('\\q'))
    return text;

  text = text.split(/\\q|"/)
  if (text.length == 4) {
    return (
      <div>
        <span>{text[0]}</span>
        <br/>
        <br/>
        <div className='quote-container'>
          <span>{text[1]}</span>
          <br/>
          <span className='quote-text'>
            <span className='accent-symbol'>"</span>
            {text[2]}
            <span className='accent-symbol'>"</span>
          </span>
          <br/>
          <span className='act-scene'>{text[3]}</span>
        </div>
      </div>
    );
  }
}

const Card = ({ history, onTextEntry, isReport }) =>
  <div className='card'>
    <div className='card-item'>
      {history.map(message =>
        <div className={`feed-item ${message.fromUser ? 'right' : 'left'}`} key={message.msgId}>
          <div className={`${message.fromUser ? 'response' : 'question'} ${message.msgId === history[history.length - 1].msgId || isReport ? '' : 'old-message'}`}>
            {process_html(message.text)}
          </div>
        </div>
      )}
      {isReport
        ? ''
        : <div className='response entry'>
            <Entry onTextEntry={onTextEntry} />
          </div>
      }
    </div>
  </div>

Card.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string
    })
  ),
  onTextEntry: PropTypes.func
};

Card.defaultProps = {
  history: [{ text: '' }]
}

export default Card;