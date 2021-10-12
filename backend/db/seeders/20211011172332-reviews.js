'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {rating: 5, comment: "Great place", userId: 1, shopId: 1}
    ], );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
