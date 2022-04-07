'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Song, { foreignKey: 'songId' });
  };
  return Comment;
};
