import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuidv1 from 'uuid';

import './index.scss';

import { plays } from '../../../data/plays';
import { post_config } from '../../../config/headers';
import { RESPONSE_URI } from '../../../config/api';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: uuidv1(),
      selectedPlay: plays[0]
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      selectedPlay: e.target.value
    })
  }

  onClick() {
    const { sessionId, selectedPlay } = this.state;
    const updatePayload = {
      session: {
        sessionId,
        selectedPlay,
        discussion: []
      }
    }

    axios.post(RESPONSE_URI, updatePayload, post_config);
  }

  render() {
    const { sessionId, selectedPlay } = this.state;

    return (
      <div className={`container centered home`}>
        <div className='title'>
          <h1>Questioner</h1>
        </div>
        <div>
          <p>
            A conversational AI to promote
            literary discussion.
          </p>
          <p>
            What work of Shakespeare would you like
            to discuss?
          </p>
          <div className='select-container'>
            <select className='select'
                    value={selectedPlay}
                    onChange={this.handleChange}>
              {plays.map((play, index) =>
                <option className='option' value={play} key={index}>
                  {play}
                </option>
              )}
            </select>
          </div>
        </div>
        <Link to={{ pathname: '/discussion', state: { sessionId, selectedPlay } }}
              onClick={this.onClick}
              className='link'>
          <div className='main-button tile'>Start a Discussion</div>
        </Link>
      </div>
    );
  }
}

export default Home;