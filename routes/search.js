const express = require('express');
const router = express.Router();
const models = require('../db/models');

router.get('/', (req, res) => {
  req.checkQuery('name', 'Invalid Query').isLength({min: 2});

  const err = req.validationErrors();
  if (err) {
    res.status(401).json(err);
  } else {
    models.store.findAll(
      {
        limit: 10,
        where: {name: {[models.Sequelize.Op.like]: `%${req.query.name}%`}}
      })
      .then(row => res.status(200).json(row));
  }
});

module.exports = router;

