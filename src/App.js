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
        <div className="content">
          <InventoryData/>
        </div>
      </div>
    );
  }
}

export default App;
