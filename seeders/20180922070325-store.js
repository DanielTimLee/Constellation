'use strict';
const seed = require('../data.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('stores', seed['data'], {});
  },

  down: (queryInterface, Sequelize) => {
    // TODO: Remove all rows in table.
    // return queryInterface.bulkInsert('stores', {}, {});
  }
};
