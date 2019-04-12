import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import logo from './logo.svg';
import './App.css';

import Welcome from './Welcome';
import Login from './Login';
import InventoryData from './InventoryData';

class NeedsAuth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    /*let { redirectToReferrer } = this.state;*/

    return (
      <div>Must be logged in to view this path: {from.pathname}! <Link to="/login" className="link"><span className="link">Click Here to login</span></Link></div>
    );
  }
}

class NoPermission extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    /*let { redirectToReferrer } = this.state;*/

    return (
      <div>You do not have permission to view this path: {from.pathname}!</div>
    );
  }
}

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var renderedComponent;

    if ((this.props.authFlags & this.props.requiredFlag) > 0){ 
      var Component = this.props.component;
      var componentProps = this.props.componentProps;

      renderedComponent = <Route render={(props) => <Component {...props} {...componentProps}/>}/>
    } else {
      renderedComponent = <Redirect to={{ pathname: "/nopermission", state: { from: this.props.location } }}/>;
    }

    if (this.props.authFlags == 0) renderedComponent = <Redirect to={{ pathname: "/needauth", state: { from: this.props.location } }}/>;

    return (
      <div>{renderedComponent}</div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authFlags: 0
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleLogin = (state) => {
    // JJV DEBUG - what to do if login failed ?
    if (state.permissions > 0) {
      this.setState({authFlags: state.permissions});
    }
    console.log(state);
  }

  render() {
    var inventoryArr = [1, 2, 3].map((idx) => 
      /*<Route path={"/i"+idx} render={(props) => <InventoryData {...props} iNumber={idx}/>}/>*/
      <ProtectedRoute path={"/i"+idx} component={InventoryData} componentProps={{iNumber: idx}} authFlags={this.state.authFlags} requiredFlag={(1 << (idx-1))}/>
    );

    return (
      <div className="App">
        <header className="App-header">
          Item Inventory
        </header>
        <Router>
        <div className="links-container">
        <Link to="/home" className="link"><span className="link">Home</span></Link> |&nbsp;
        <Link to="/i1" className="link"><span className="link">Inventory 1</span></Link> |&nbsp;
        <Link to="/i2" className="link"><span className="link">Inventory 2</span></Link> |&nbsp;
        <Link to="/i3" className="link"><span className="link">Inventory 3</span></Link> |&nbsp;
        <Link to="/login" className="link"><span className="link">Login</span></Link>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
            <Route path="/home" component={Welcome}/>
            <Route path="/needauth" component={NeedsAuth}/>
            <Route path="/nopermission" component={NoPermission}/>
            <Route path="/login" render={(props) => <Login {...props} onLoginUpdate={this.handleLogin}/>}/>
            {inventoryArr}
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
