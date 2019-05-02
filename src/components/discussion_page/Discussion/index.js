import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuidv1 from 'uuid';
import PropTypes from 'prop-types';

import './index.scss';

import Card from '../Card';

import { post_config } from '../../../config/headers';
import { errorState } from '../../../data/errorData';
import { RESPONSE_URI, QUESTIONS_URI } from '../../../config/api';

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: props.location.state.sessionId,
      selectedPlay: props.location.state.selectedPlay,
      history: [
        {
          msgId: 0,
          fromUser: false,
          text: 'Loading...'
        }
      ],
    };

    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  componentDidMount() {
    const { sessionId } = this.state;
    this._mounted = true;

    axios.get(QUESTIONS_URI, { params: { sessionId } })
      .then(res => {
        if (!this._mounted) return;
        this.setState({
          history: [
            {
              msgId: uuidv1(),
              text: res.data.question,
              fromUser: false
            }
          ]
        });
      })
      .catch(error => {
        if (!this._mounted) return;
        console.log(error);
        this.setState(errorState);
      });
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleTextEntry(text) {
    const { sessionId, selectedPlay, history } = this.state;
    const updatePayload = {
      session: {
        sessionId,
        selectedPlay,
        discussion: [
          ...history,
          {
            msgId: uuidv1(),
            text,
            fromUser: true
          }
        ]
      }
    }

    // POST question and user response
    axios.post(RESPONSE_URI, updatePayload, post_config)
      .then(() => {
        // GET next question
        axios.get(QUESTIONS_URI, { params: { sessionId } })
          .then(res => {
            this.setState({
              history: [
                {
                  msgId: uuidv1(),
                  text: res.data.question,
                  fromUser: false
                }
              ]
            });
          })
          .catch(error => {
            console.log(error);
            this.setState(errorState);
          });
      })
      .catch(error => {
        console.log(error);
        this.setState(errorState);
      });
  }

  render() {
    const { sessionId, history } = this.state;

    return (
      <div className='container centered'>
        <div className='title'>
          <h1 className='big-title'>Questioner</h1>
        </div>
        <div className='tile'>
          <Card history={history} onTextEntry={this.handleTextEntry} />
        </div>
        <Link to={{ pathname: '/report', state: { sessionId } }}
              className='link'>
          <div className='main-button tile'>End Discussion</div>
        </Link>
      </div>
    );
  }
}

Discussion.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      sessionId: PropTypes.string,
      selectedPlay: PropTypes.string
    })
  })
};

export default Discussion;
