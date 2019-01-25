import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './index.scss';

import QuestionAgent from '../../logic/questionAgent';

import Card from '../Card';

class Discussion extends Component {
  constructor(props) {
    super(props);

    const questionAgent = new QuestionAgent();

    this.state = {
      nextId: 1,
      questionAgent,
      history: [
        {
          id: 0,
          fromUser: false,
          text: 'NO QUESTION GIVEN'
        }
      ],
    };

    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/v0/questions')
      .then(res => {
          const data = res.data;

          this.setState({
            history: [
              {
                id: 0,
                text: data.question,
                fromUser: false
              }
            ]
          })
      });
  }

  handleTextEntry(text) {
    const { history, nextId, questionAgent } = this.state;

    this.setState({
      history: [
        ...history,
        {
          id: nextId,
          text,
          fromUser: true
        },
        {
          id: nextId + 1,
          text: questionAgent.getQuestion(),
          fromUser: false
        }
      ],
      nextId: nextId + 2
    });
  }

  render() {
    const { history } = this.state;

    return (
      <div className='container centered'>
        <div className='title'>
          <h1>Questioner</h1>
        </div>
        <div className='tile'>
          <Card history={history} onTextEntry={this.handleTextEntry} />
        </div>
        <Link to='/report' className='link'>
          <div className='main-button tile'>End Discussion</div>
        </Link>
      </div>
    );
  }
}

export default Discussion;
