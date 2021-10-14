'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    booking_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Booking, {foreignKey: 'booking_id'})
  };
  return Review;
};
