import React from 'react';
import './index.scss';

const Feed = ({ history }) =>
  <div className='feed'>
    {history.map(message =>
      <div className={`feed-item ${message.fromUser ? 'right' : 'left'}`} key={message.msgId}>
        <div className='text'>
          {message.text}
        </div>
      </div>
    )}
  </div>

export default Feed;