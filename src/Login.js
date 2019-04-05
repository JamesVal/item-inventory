import React, { Component } from 'react';
import $ from 'jquery';
import './Login.css';

import loginClient from './login-cli';

class LoginInfo {
  constructor() {

  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInfo: {
        user: "",
        password: ""
      }
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleChangeUsername(evt) {
    let curStateLogin = this.state.loginInfo;
    curStateLogin.user = evt.target.value;
    this.setState({loginInfo: curStateLogin});
  }

  handleChangePassword(evt) {
    let curStateLogin = this.state.loginInfo;
    curStateLogin.password = evt.target.value;
    this.setState({loginInfo: curStateLogin});
  }

  handleLogin() {
    console.log("click", this.state.loginInfo);
    loginClient.postLogin(this.state.loginInfo)
      .then((result) => {

      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <div className="data-container">
        <div className="table-container">
          <div className="table-header">User Login</div>

          <div className="login-wrapper">
          <div className="login-info">
            <div className="login-input"><div className="login-text">Username: </div><input type="text" name="username" onChange={this.handleChangeUsername}/></div>
            <div className="login-input"><div className="login-text">Password: </div><input type="password" name="password" onChange={this.handleChangePassword}/></div>
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