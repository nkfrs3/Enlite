'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
    Checkin.belongsTo(models.User, {foreignKey: 'userId',} )
    Checkin.belongsTo(models.Shop, {foreignKey: 'shopId'})
  };
  return Checkin;
};
