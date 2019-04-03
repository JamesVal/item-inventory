import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleLogin() {
    console.log("click");
  }

  render() {
    return (
      <div className="data-container">
        <div className="table-container">
          <div className="table-header">User Login</div>

          <div className="login-wrapper">
          <div className="login-info">
            <div className="login-input"><div className="login-text">Username: </div><input type="text" name="username" /></div>
            <div className="login-input"><div className="login-text">Password: </div><input type="password" name="password" /></div>
          </div>
            <div className="login">
              <div className="button-div"><span onClick={this.handleLogin}>Login</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;