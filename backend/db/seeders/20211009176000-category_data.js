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
          name: "Special Use Aircraft",
          url: 'https://i.insider.com/5f3d84f042f43f001ddfde5c?width=1000&format=jpeg&auto=webp'
        },
        {
          name: "Warbirds",
          url: 'https://arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/V5INQLSHAJUO6K3LNNXWZ7TQ5E.jpg'
        },
        {
          name: "Helicopters",
          url: 'https://avioninsurance.com/wp-content/uploads/2020/09/helicopter-safety.jpeg'
        },
        {
          name: "Jets",
          url: 'https://exclusive.multibriefs.com/images/exclusive/0113jetlinx.jpg'
        },
        {
          name: "Single Prop",
          url: 'https://www.southernwings.co.nz/wp-content/uploads/2020/07/private-light-airplane.jpeg'
        },
        {
          name: "Double Prop",
          url: 'https://www.flyingmag.com/resizer/wyRbvOwfZyAalGYyyURpw8Y24do=/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/LFMMMNHI7BGHFLLV4PE3DGNPEU.jpg'
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
