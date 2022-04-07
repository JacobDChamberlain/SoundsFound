'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        userId: "1",
        url: "http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3",
        title: "Haydn"
      },
      {
        userId: "1",
        url: "http://www.hochmuth.com/mp3/Vivaldi_Sonata_eminor_.mp3",
        title: "Vivaldi"
      },
      {
        userId: "2",
        url: "http://www.hochmuth.com/mp3/Tchaikovsky_Rococo_Var_orch.mp3",
        title: "Tchaikovsky"
      },
      {
        userId: "3",
        url: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
        title: "Boccerini"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
