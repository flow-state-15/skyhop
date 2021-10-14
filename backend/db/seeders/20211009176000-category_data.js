"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Single Engine Prop",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633972109/shipshape-project/sailboat_category_img_w61x2x.jpg'
        },
        {
          name: "Twin Engine Prop",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633972489/shipshape-project/bluewater_category_img_uistbj.jpg'
        },
        {
          name: "Light Jet",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633972642/shipshape-project/fishing_category_img_oypts3.jpg'
        },
        {
          name: "Commercial",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633972772/shipshape-project/sport_category_img_a4ea88.jpg'
        },
        {
          name: "Rotorcraft",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633974118/shipshape-project/pleasure_category_img_jx57ie.jpg'
        },
        {
          name: "Other",
          url: 'https://res.cloudinary.com/dan-purcell-2021/image/upload/v1633974534/shipshape-project/utility_category_img_u6qd6i.jpg'
        },
    ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
