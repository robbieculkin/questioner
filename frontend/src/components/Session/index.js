import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';

import QuestionAgent from '../../logic/questionAgent';

// import Entry from '../Entry';
// import Feed from '../Feed';
import Card from '../Card';

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
      <div>
        <Card history={history} onTextEntry={this.handleTextEntry} />
      </div>
      // <div>
      //   <Feed history={history} />
      //   <Entry onTextEntry={this.handleTextEntry} />
      // </div>
    );
  }
}

export default Session;
