'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: "1",
        songId: "1",
        body: "Duuuude, Haydn ruuuules~"
      },
      {
        userId: "2",
        songId: "1",
        body: "Right??"
      },
      {
        userId: "3",
        songId: "3",
        body: "Yall ever heard of rococo's basilisk?"
      },
      {
        userId: "2",
        songId: "4",
        body: "Broccolini knocks"
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
