import React, { Component } from 'react';
import $ from 'jquery';
import './Welcome.css';

import dbClient from './api-db-cli';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div class="content">Welcome!</div>
    );
  }
}

export default Welcome;