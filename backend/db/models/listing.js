"use strict";
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define(
    "Listing",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      owner_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      img_url: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );
  Listing.associate = function (models) {
    // associations can be defined here
    Listing.hasMany(models.Booking, {
      foreignKey: "listing_id",
      onDelete: "cascade",
      hooks: true,
    });
    Listing.belongsTo(models.User, {
      foreignKey: "owner_id",
    });
    Listing.belongsTo(models.Category, {
      foreignKey: "category_id",
    });
  };
  return Listing;
};
