'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    website: DataTypes.STRING,
    image: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    long: DataTypes.FLOAT,
  },{});
  Shop.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: 'Review',
      otherKey: 'userId',
      foreignKey: 'shopId',
     }
     const columnMappingCheckin = {
      through: 'Checkin',
      otherKey: 'userId',
      foreignKey: 'shopId',
     }

    Shop.belongsToMany(models.User, columnMapping )
    Shop.hasMany(models.Review, { foreignKey:'shopId'})
    // Shop.belongsToMany(models.Checkin, columnMappingCheckin )
    Shop.hasMany(models.Checkin, { foreignKey:'shopId'})
  };

  return Shop;
};
