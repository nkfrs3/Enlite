'use strict';

const { FOREIGNKEYS } = require("sequelize/types/lib/query-types");

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      validate: {len: [0, 500]}
    },
    image: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shopId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      },
  },
  {
    indexes: [
        {
            unique: true,
            fields: ['userId', 'shopId']
        }
    ]
}
//   {
//     uniqueKeys: {
//         Items_unique: {
//             fields: ['userId', 'shopId']
//         }
//     }
// }

);
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User,  {foreignKey: 'userId'})

  };
  return Review;
};
