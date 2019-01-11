import React, { Component } from 'react';
import './index.scss';

import QuestionAgent from '../../logic/questionAgent';

import Entry from '../Entry';
import Feed from '../Feed';

class Session extends Component {
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
          text: questionAgent.getQuestion()
        }
      ],
    };

    this.handleTextEntry = this.handleTextEntry.bind(this);
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
      <div>
        <Feed history={history} />
        <Entry onTextEntry={this.handleTextEntry} />
      </div>
    );
  }
}

export default Session;
