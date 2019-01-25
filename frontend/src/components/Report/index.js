import React, { Component } from 'react';
import axios from 'axios';

import './index.scss';

import Feed from '../Feed';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/v0/report')
      .then(res => {
          const data = res.data;

          this.setState({
            history: data.history
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
