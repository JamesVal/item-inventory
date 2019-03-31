import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Welcome from './Welcome';
import InventoryData from './InventoryData';

class App extends Component {
  render() {
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
            <Route path="/i1" render={(props) => <InventoryData {...props} iNumber={1}/>}/>
            <Route path="/i2" render={(props) => <InventoryData {...props} iNumber={2}/>}/>
            <Route path="/i3" render={(props) => <InventoryData {...props} iNumber={3}/>}/>
          </Switch>
        </div>
        </Router>
      </div>
    );
  }
}

export default App;
