const express = require('express');
const {check} = require('express-validator/check');
const router = express.Router();
const models = require('../db/models');

router.get('/name', [
  check('name', 'Invalid Query').isLength({min: 2}),
  check('limit', 'Invalid limit').optional().isInt({lt: 999}).toInt()
], (req, res) => {
  const err = req.validationErrors();
  if (err) {
    res.status(401).json(err);
  } else {
    const {name} = req.query;
    const op = models.Sequelize.Op;

    models.store.findAll({
      limit: req.query.limit || 10,
      where: {name: {[op.like]: `%${name}%`}}
    }).then(row => res.status(200).json(row));
  }
});

router.get('/near', [
  check('x', 'Invalid location').isFloat({gt: 124, lt: 132}).toFloat(),
  check('y', 'Invalid location').isFloat({gt: 33, lt: 43}).toFloat(),
  check('limit', 'Invalid limit').optional().isInt({lt: 999}).toInt()
], (req, res) => {
  const err = req.validationErrors();
  if (err) {
    res.status(401).json(err);
  } else {
    const {x: lng, y: lat} = req.query;
    const op = models.Sequelize.Op;

    models.store.findAll({
      limit: req.query.limit || 10,
      where: {
        [op.and]: {
          x: {[op.between]: [lng - 0.035, lng + 0.035]},
          y: {[op.between]: [lat - 0.027, lat + 0.027]}
        }
      }
    }).then(row => res.status(200).json(row));
  }
});

module.exports = router;

