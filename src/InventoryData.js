import React, { Component } from 'react';
import $ from 'jquery';
import './InventoryData.css';

import dbClient from './api-db-cli';

class ItemInfo {
  constructor(id, item_name, quantity, price) {
    this._id = id;
    this.item_name = item_name;
    this.quantity = quantity;
    this.price = price;
  }
}

class InventoryData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
  }

  componentDidMount() {
    let tableArray = [];
    
    /* Create some test data */
    /*
    for (let i = 0; i < 15; i++) {
      let dateTime = new Date();
      let curData = new inventoryData(i, "Test"+(i+1));
      tableArray.push(curData);
    }
    this.setState({tableData: tableArray});
    */

    dbClient.getAllData().then((data) => {
      let newList = [];

      for (let idx = 0; idx < data.length; idx++) {
        let newItem = new ItemInfo(
          data[idx]._id,
          data[idx].item_name,
          data[idx].quantity,
          data[idx].price
        );

        newList.push(newItem);
      }

      this.setState({tableData: newList});
    });
  }

  componentWillUnmount() {
  }

  isOdd(idx) {
    if ((idx & 0x01) === 0) return "odd";
    else return "even";
  }

  handleTestRead() {
    console.log("test_read");
    dbClient.getAllData().then((data) => {
      this.setState({tableData: data});
    });
  }

  handleClick = (idx) => (evt) => {
    console.log("click", idx);
  }

  handleAddClick() {
    let curData = this.state.tableData;
    let newItem = new ItemInfo(0, "", 0, 0.0);

    curData.push(newItem);
    this.setState({tableData: curData});
    console.log("addClick");
  }

  handleRemoveClick = (idx) => (evt) => {
    console.log("remove");
    let curData = this.state.tableData;
    curData.splice(idx, 1);

    this.setState({tableData: curData});
  }

  handleChange = (idx) => (evt) => {
    console.log("change", idx);

    let curTableData = this.state.tableData;
    curTableData[idx].item_name = evt.target.value;

    this.setState({tableData: curTableData});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
  
    dbClient.deleteAllData().then((data) => {
      console.log(data);
      return dbClient.addNewData(this.state.tableData);
    }) 
    .then((data) => {
      console.log(data);
      return dbClient.getAllData();
    })
    .then((data) => {
      console.log(data);
      let newList = [];

      for (let idx = 0; idx < data.length; idx++) {
        let newItem = new ItemInfo(
          data[idx]._id,
          data[idx].item_name,
          data[idx].quantity,
          data[idx].price
        );

        newList.push(newItem);
      }

      this.setState({tableData: newList});
    });
  }

  render() {
    let tableRows = this.state.tableData.map((tableData, idx) => 
      <tr key={idx} className={this.isOdd(idx)}>
        <td onClick={this.handleClick(idx)}>{idx+1}</td>
        <td><input type="text" onChange={this.handleChange(idx)} value={tableData.item_name} /></td>
        <td><span className="remove-item" onClick={this.handleRemoveClick(idx)}>X</span></td>
      </tr>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="data-container">
          <div className="table-container">
            <div className="table-header">Inventory Data {this.props.iNumber}</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
            <div className="add-item-wrapper">
              <div className="add-item">
                <div className="button-div"><span onClick={this.handleAddClick}>Add Item</span></div>
              </div>
            </div>
            <div className="footer-buttons"><input type="submit" value="Submit" /></div>
          </div>
        </div>
        { /*<button type="button" onClick={this.handleTestRead.bind(this)}>test_get</button>*/ }
      </form>
    );
  }
}

export default InventoryData;