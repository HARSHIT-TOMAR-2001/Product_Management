require('dotenv').config();
const express = require('express');
const app = express();

const cors = require('cors');
var mongoose = require('mongoose');
const Router = require('./router');
const bodyParser = require('body-parser');
const db = require('./database/connect');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', Router);
app.get('/', function (req, res) {
  res.send('Product Management');
});
const PORT = process.env.PORT || 5000;


db.connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is up and running at port:', PORT);
    });
  });
module.exports = app;