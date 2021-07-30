'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      // unique: true
    },
    businessId: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Rating.associate = function(models) {
    // associations can be defined here
    Rating.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Rating;
};