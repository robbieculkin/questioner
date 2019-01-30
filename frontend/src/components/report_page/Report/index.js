import React, { Component } from 'react';
import axios from 'axios';
import uuidv1 from 'uuid';

import './index.scss';

import Feed from '../Feed';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: props.location.state.sessionId,
      history: []
    };
  }

  componentDidMount() {
    const { sessionId } = this.state;

    axios.get('http://localhost:5000/api/v0/report', {
        params: { sessionId }
      })
      .then(res => {
        const data = res.data;
        console.log(data.discussion);

        this.setState({
          history: data.discussion
        })
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

  render() {
    const { history } = this.state;

    return (
      <div className='container centered'>
        <div className='title'>
          <h1>Discussion Report</h1>
        </div>
        <div className='tile'>
          <Feed history={history} />
        </div>
      </div>
    );
  }
}

export default Report;
