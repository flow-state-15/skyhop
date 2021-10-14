"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Listing, {
      foreignKey: "category_id",
      onDelete: 'cascade',
      hooks: true
    });
  };
  return Category;
};
