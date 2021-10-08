'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    image: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,

  },{});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};
