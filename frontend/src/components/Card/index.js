import React from 'react';
import './index.scss';

import Entry from '../Entry';

const Card = ({ history, onTextEntry }) =>
  <div className='card'>
    <div className='card-item'>
        <div className='question'>
          {history[history.length - 1].text}
        </div>
        <Entry onTextEntry={onTextEntry} />
    </div>
  </div>

export default Card;