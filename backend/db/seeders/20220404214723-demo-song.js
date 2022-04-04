'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        userId: "1",
        url: "https://t4.bcbits.com/stream/d0f1bcf41de7b075768a32afcb79bd1d/mp3-128/2655191442?p=0&amp;ts=1649174217&amp;t=64ac0757fe90a4f07c762ecee7e30a91160e7b8c&amp;token=1649174217_61f81f5660a356d7f3704402b309e46693c1504b&quot",
        title: "Guilty (Until Proven Innocent)"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
