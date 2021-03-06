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
      scrollY: window.scrollY,
      sessionId: props.location.state.sessionId,
      selectedPlay: props.location.state.selectedPlay,
      isReport: false,
      history: [
        {
          msgId: 0,
          fromUser: false,
          text: 'Loading...'
        }
      ],
    };

    this.handleTextEntry = this.handleTextEntry.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
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

    // Add event on scroll
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const scrollY = window.scrollY;

    this.setState({ scrollY });
  }

  handleClick() {
    const { history } = this.state;

    if (!history[history.length - 1].fromUser)
      history.pop();

    this.setState({ isReport: true, history });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  handlePrint() {
    window.print();
  }

  handleTextEntry(text) {
    const { sessionId, selectedPlay, history } = this.state;
    const discussion = [
      ...history,
      {
        msgId: uuidv1(),
        text,
        fromUser: true
      }
    ];
    const updatePayload = {
      session: {
        sessionId,
        selectedPlay,
        discussion: discussion.slice(-2)  // Only send the new part
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
                ...discussion,
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

    // Scroll to bottom of the page (?)
    const scroller = () => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    };

    setTimeout(scroller, 75);
  }

  render() {
    const { history, scrollY, isReport } = this.state;

    return (
      <div className='discussion container right-container'>
        <div className='title'>
          <h1 className='big-title'>Questioner</h1>
          {isReport
            ? <h1 className='small-title'>Discussion Report</h1>
            : ''
          }
          <div className={`fixed-title ${scrollY < 250 ? 'hidden-fade' : 'visible-fade'} `}>
            <h1 className='big-title'>Questioner</h1>
            {isReport
              ? <h1 className='small-title left-align'>Discussion Report</h1>
              : ''
            }
          </div>
        </div>
        <Card history={history} onTextEntry={this.handleTextEntry} isReport={isReport} />
        {isReport
          ? <div className='link-container'>
              <Link to='/' className='link'>
                <div>Home</div>
              </Link>
              <div className='link print' onClick={this.handlePrint}>Print</div>
            </div>
          : <div className='link-container'>
              <div onClick={this.handleClick} className='link'>End Discussion</div>
            </div>
        }
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
