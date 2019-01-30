import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const Home = () =>
  <div className={`container centered home`}>
    <div className='title'>
      <h1>Questioner</h1>
    </div>
    <div>
      <p>
        Welcome to Questioner, a conversational AI to promote
        literary discussion in a seminar style.
      </p>
    </div>
    <Link to='/discussion' className='link'>
      <div className='main-button tile'>Start a Discussion</div>
    </Link>
  </div>

export default Home;