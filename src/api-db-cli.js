import $ from 'jquery';
import environment_vars from './environment/environment-secret';

function DBClient() {
  this.serverURI = environment_vars.dbServerURI;
}

DBClient.prototype.addNewData = function(newData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: this.serverURI+"/api_db/add_new_data",
      crossDomain: true,
      data: JSON.stringify({"tableData": newData}),
      contentType: "application/json"
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
}

DBClient.prototype.updateData = function(tableData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: this.serverURI+"/api_db/update_data",
      crossDomain: true,
      data: JSON.stringify({"tableData": tableData}),
      contentType: "application/json"
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
}

DBClient.prototype.deleteData = function(tableData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: this.serverURI+"/api_db/delete_data",
      crossDomain: true,
      data: JSON.stringify({"tableData": tableData}),
      contentType: "application/json"
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
}

DBClient.prototype.deleteAllData = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: this.serverURI+"/api_db/delete_all_data",
      crossDomain: true,
      contentType: "application/json"
    }).done((data) => {
      resolve(data);
    }).fail((err) => {
      reject(err);
    });
  });
}

DBClient.prototype.getAllData = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "GET",
      url: this.serverURI+"/api_db/get_all_data",
      crossDomain: true,
    }).done((data) => {
      resolve(JSON.parse(data).all_items);
    }).fail((err) => {
      reject(err);
    });
  });
}

const dbClient = new DBClient();

export default dbClient;