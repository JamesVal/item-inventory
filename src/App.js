import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import InventoryData from './InventoryData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Item Inventory
        </header>
        <div className="links-container">
        <span className="link">Inventory 1</span> | <span className="link">Inventory 2</span> | <span className="link">Inventory 3</span>
        </div>
        <div className="content">
          <InventoryData iNumber={1}/>
        </div>
      </div>
    );
  }
}

export default App;
