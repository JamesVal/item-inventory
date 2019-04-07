const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const api_db = require('./api-db/api-db');
const api_login = require('./api-login/api-login');

app.use(cors());
app.options("*", cors());

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../build')));

/* Setup routes */
app.use("/api_db", api_db);
app.use("/auth", api_login);

/* Default to index.html */
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

console.log("listening on port 9001");

app.listen(9001);