"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      listing_id: DataTypes.INTEGER,
      renter_id: DataTypes.INTEGER,
      book_start: DataTypes.DATE,
      book_end: DataTypes.DATE,
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.Listing, { foreignKey: "listing_id" });
    Booking.belongsTo(models.User, { foreignKey: "renter_id" });
    Booking.belongsTo(models.Review, {
      foreignKey: "booking_id",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Booking;
};
