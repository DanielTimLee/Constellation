'use strict';
module.exports = (sequelize, DataTypes) => {
  const store = sequelize.define('store', {
    name: DataTypes.STRING,
    addr: DataTypes.STRING,
    road_addr: DataTypes.STRING,
    x: DataTypes.STRING,
    y: DataTypes.STRING
  }, {});
  store.associate = function (models) {
    // associations can be defined here
  };
  return store;
};
