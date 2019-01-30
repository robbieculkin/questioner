import React from 'react';
import './index.scss';

import Entry from '../Entry';

const Card = ({ history, onTextEntry }) =>
  <div className='card'>
    <div className='card-item'>
      <div className='question'>
        {history[history.length - 1].text}
      </div>
      <div className='response'>
        <Entry onTextEntry={onTextEntry} />
      </div>
    </div>
  </div>

export default Card;