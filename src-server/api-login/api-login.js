const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const utils = require('../utils');

const environment_vars = require('../environment/environment-secret');
const uri = environment_vars.mongoDbURI;

/* POST api listing. */
router.post('/', (req, res) => {
  console.log("auth post", req.body.login);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("logins").collection("all_logins");
    let collectionData = collection.find({user: req.body.login.user}).toArray();
    collectionData.then((data) => {
      if (data.length) {
        console.log("data", data);
        if (req.body.login.password === data[0].password) {
          const token = utils.getUid(256);
          res.send(JSON.stringify({"token": token, "error": ""}));
        } else {
          res.send(JSON.stringify({"token": "", "error": "Error: Wrong username or password"}));
        }
      } else {
        res.send(JSON.stringify({"token": "", "error": "Error: Wrong username or password"}));
      }
    });
    client.close();
  });
});

/*
router.post('/add_new_data', (req, res) => {
  //console.log(req);
  console.log(req.body.tableData);
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    collection.insertMany(req.body.tableData)
    .then((result) => {
      console.log(result);
      res.send("add new data");
    });
    client.close();
  });
});
*/

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('get api works');
  console.log("auth get");
});

/*
router.get('/get_all_data', (req, res) => {
  let client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect(err => {
    let collection = client.db("inventory_items").collection("all_items");
    let collectionData = collection.find({}).toArray();
    collectionData.then((data) => {
      res.send(JSON.stringify({"all_items": data}));
    });
    client.close();
  });
});
*/

module.exports = router;