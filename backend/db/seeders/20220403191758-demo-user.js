'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-licious',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeMane1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'FakeMane2',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {
      username: { [Op.in]: ['Demo-licious', 'FakeMane1', 'FakeMane2'] }
    }, {});
  }
};
