import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const process_html = text => text.split('\\n').map((item, key) => <span key={key}>{item}<br/></span>);

const Feed = ({ history }) =>
  <div className='feed'>
    {history.map(message =>
      <div className={`feed-item ${message.fromUser ? 'right' : 'left'}`} key={message.msgId}>
        <div className='text'>
          {process_html(message.text)}
        </div>
      </div>
    )}
  </div>

Feed.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      msgId: PropTypes.string,
      fromUser: PropTypes.bool,
      text: PropTypes.string
    })
  )
};

Feed.defaultProps = {
  history: []
};

export default Feed;