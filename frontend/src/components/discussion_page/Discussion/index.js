import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import uuidv1 from 'uuid';

import './index.scss';

import Card from '../Card';

import { post_config } from '../../../config/headers';

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: uuidv1(),
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

    axios.get('http://localhost:5000/api/v0/questions', {
        params: { sessionId }
      })
      .then(res => {
        const data = res.data;

        this.setState({
          history: [
            {
              msgId: uuidv1(),
              text: data.question,
              fromUser: false
            }
          ]
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          history: [
            {
              msgId: uuidv1(),
              text: 'Oops, something went wrong! Please try again.',
              fromUser: false
            }
          ]
        })
      });
  }

  handleTextEntry(text) {
    const { sessionId, history } = this.state;
    const updatePayload = {
      session: {
        sessionId,
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

    axios.post('http://localhost:5000/api/v0/response',
               updatePayload, post_config)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      history: [
        {
          msgId: uuidv1(),
          text: 'next question here',
          fromUser: false
        }
      ],
    });
  }

  render() {
    const { sessionId, history } = this.state;

    return (
      <div className='container centered'>
        <div className='title'>
          <h1>Questioner</h1>
        </div>
        <div className='tile'>
          <Card history={history} onTextEntry={this.handleTextEntry} />
        </div>
        <Link to={{ pathname: '/report', state: { sessionId } }} className='link'>
          <div className='main-button tile'>End Discussion</div>
        </Link>
      </div>
    );
  }
}

export default Discussion;
