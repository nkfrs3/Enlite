'use strict';
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
      validate: {len: [3, 500]}
    },
    image: DataTypes.STRING,
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    // shopId: {
    //   type:DataTypes.INTEGER,
    //   allowNull: false,
    //   },
  },
  {
    uniqueKeys: {
        Items_unique: {
            fields: ['userId', 'shopId']
        }
      //   {
      //     indexes: [
      //         {
      //             unique: true,
      //             fields: ['user_id', 'count', 'name']
      //         }
      //     ]
      // }
    }
});
  Review.associate = function(models) {
    // associations can be defined here

  };
  return Review;
};
