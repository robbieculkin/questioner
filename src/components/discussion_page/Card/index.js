import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Entry from '../Entry';

const process_html = text => text.split('\\n').map((item, key) => <span key={key}>{item}<br/></span>);

const Card = ({ history, onTextEntry }) =>
  <div className='card'>
    <div className='card-item'>
      {history.map(message =>
        <div className={`feed-item ${message.fromUser ? 'right' : 'left'}`} key={message.msgId}>
          <div className={`${message.fromUser ? 'response' : 'question'} ${message.msgId === history[history.length - 1].msgId ? '' : 'old-message'}`}>
            {process_html(message.text)}
          </div>
        </div>
      )}
      <div className='response entry'>
        <Entry onTextEntry={onTextEntry} />
      </div>
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