import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

import { plays } from '../../../data/plays';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlay: plays[0]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      selectedPlay: e.target.value
    })
  }

  render() {
    const { selectedPlay } = this.state;

    return (
      <div className={`container centered home`}>
        <div className='title'>
          <h1>Questioner</h1>
        </div>
        <div>
          <p>
            Welcome to Questioner, a conversational AI to promote
            literary discussion in a seminar style.
          </p>
          <p>
            Please select the Shakespeare play that you would like
            to discuss.
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
          <p>
            Press the button below to start a discussion!
          </p>
        </div>
        <Link to={{ pathname: '/discussion', state: { selectedPlay } }}
              className='link'>
          <div className='main-button tile'>Start a Discussion</div>
        </Link>
      </div>
    );
  }
}

export default Home;