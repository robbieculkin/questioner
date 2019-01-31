import React, { Component } from 'react';
import axios from 'axios';

import './index.scss';

import Feed from '../Feed';

import { errorState } from '../../../data/error-data';
import { REPORT_URI } from '../../../config/api';

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
    this._mounted = true;

    axios.get(REPORT_URI, { params: { sessionId } })
      .then(res => {
        if (!this._mounted) return;
        this.setState({ history: res.data.discussion });
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
