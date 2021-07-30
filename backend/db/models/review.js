'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      // unique: true
    },
    businessId: DataTypes.STRING,
    reviewText: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Review;
};