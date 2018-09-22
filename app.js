const express = require('express');
const cors = require('cors');
const validator = require('express-validator');

const models = require('./db/models');
models.sequelize.sync()
  .then(() => {
    console.log('✓ DB connection success. Press CTRL-C to stop\n');
  })
  .catch(err => {
    console.error(err);
    console.log('✗ DB connection error. Please make sure DB is running.');
    process.exit();
  });

const app = express();
app.use(cors());
app.use(validator());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/search', (req, res) => {
  req.checkQuery('name', 'Invalid Query').isLength({min: 2});

  const err = req.validationErrors();
  if (err) {
    res.status(401).json(err);
  } else {

  }
});

process
  .on('unhandledRejection', (error) => {
    console.error(`unhandledRejection ${error.stack}`);
    process.exit(1);
  })
  .on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.stack}`);
    process.exit(1);
  });

module.exports = app;
