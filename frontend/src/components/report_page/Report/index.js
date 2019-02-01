import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './index.scss';

import Feed from '../Feed';

import { errorState, emptyState } from '../../../data/error-data';
import { REPORT_URI } from '../../../config/api';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId: props.location.state.sessionId,
      selectedPlay: 'Loading...',
      history: []
    };
  }

  componentDidMount() {
    const { sessionId } = this.state;
    this._mounted = true;

    axios.get(REPORT_URI, { params: { sessionId } })
      .then(res => {
        if (!this._mounted) return;
        if ('discussion' in res.data) {
          this.setState({
            selectedPlay: res.data.selectedPlay,
            history: res.data.discussion
          });
        } else {
          this.setState(emptyState);
        }
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
    const { sessionId, selectedPlay, history } = this.state;

    return (
      <div className='container centered'>
        <div className='title'>
          <h1>Discussion Report</h1>
        </div>
        <div className='details'>
          <p>Session ID: {sessionId}</p>
          <p>Selected play: {selectedPlay}</p>
        </div>
        <div className='tile'>
          <Feed history={history} />
        </div>
        <Link to='/' className='link'>
          <div className='main-button tile'>Home</div>
        </Link>
      </div>
    );
  }
}

export default Report;
