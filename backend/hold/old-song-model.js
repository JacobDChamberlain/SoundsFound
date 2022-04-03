'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Song.associate = function(models) {
    // Song.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Song;
};
