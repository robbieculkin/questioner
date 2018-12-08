import React from 'react';
import './index.scss';

import Session from '../Session';

const Home = () =>
  <div className={`container centered home`}>
    <div className='title'>
      <h1> Questioner </h1>
    </div>
    <br />
    <Session />
  </div>

export default Home;