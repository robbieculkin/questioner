import React, { Component } from 'react';
import './index.scss';

import Entry from '../Entry';
import Feed from '../Feed';

class Session extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextId: 1,
      history: [
        {
          id: 0,
          fromUser: false,
          text: 'Hello, how are you?'
        }
      ]
    };

    this.handleTextEntry = this.handleTextEntry.bind(this);
  }

  handleTextEntry(text) {
    const { history, nextId } = this.state;

    this.setState({
      history: [
        ...history,
        {
          id: nextId,
          text,
          fromUser: true
        }
      ],
      nextId: nextId + 1
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
