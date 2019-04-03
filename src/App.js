import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Welcome from './Welcome';
import Login from './Login';
import InventoryData from './InventoryData';

var isAuth = false;

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

class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var renderedComponent = <Redirect to={{ pathname: "/needauth", state: { from: this.props.location } }}/>;


    if (isAuth) {
      var Component = this.props.component;
      var componentProps = this.props.componentProps;

      renderedComponent = <Route render={(props) => <Component {...props} {...componentProps}/>}/>
    }

    return (
      <div>{renderedComponent}</div>
    );
  }
}

class App extends Component {
  render() {
    var inventoryArr = [1, 2, 3].map((idx) => 
      /*<Route path={"/i"+idx} render={(props) => <InventoryData {...props} iNumber={idx}/>}/>*/
      <ProtectedRoute path={"/i"+idx} component={InventoryData} componentProps={{iNumber: idx}}/>
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
        <Link to="/i3" className="link"><span className="link">Inventory 3</span></Link>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home"/>}/>
            <Route path="/home" component={Welcome}/>
            <Route path="/needauth" component={NeedsAuth}/>
            <Route path="/login" component={Login}/>
            {inventoryArr}
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
